> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Uptime Optimization

> OpenRouter tracks provider availability

export const UptimeChart = ({permaslug}) => {
  const [uptime, setUptime] = useState(null);
  const [didError, setDidError] = useState(false);
  const getAvailabilityFillClass = availability => {
    if (availability === null) return "fill-current text-gray-500";
    if (availability >= 95) return "fill-current text-green-500";
    if (availability >= 85) return "fill-current text-yellow-600";
    return "fill-current text-red-500";
  };
  const formatPercent = value => {
    if (typeof value !== "number") return "N/A";
    const normalizedValue = Number((value * 100).toPrecision(12));
    return `${(Math.floor(normalizedValue) / 100).toFixed(2)}%`;
  };
  const formatTimestamp = timestamp => {
    if (!timestamp) return "No data";
    return new Date(`${timestamp.replace(" ", "T")}Z`).toLocaleString();
  };
  const getRecentDomain = (points, fields) => {
    const values = fields.flatMap(field => points.map(point => point[field]).filter(value => typeof value === "number" && Number.isFinite(value)));
    if (values.length === 0) return {
      min: 0,
      max: 100
    };
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const padding = Math.max((maximum - minimum) * 0.1, 0.5);
    const min = Math.max(0, Math.floor(minimum - padding));
    const max = Math.min(100, Math.ceil(maximum + padding));
    if (min < max) return {
      min,
      max
    };
    if (min === 0) return {
      min: 0,
      max: 1
    };
    return {
      min: min - 1,
      max
    };
  };
  const getLineSegments = (points, field, domainMin, domainMax, plotLeft, plotWidth) => {
    const segments = [];
    let segment = [];
    const denominator = Math.max(points.length - 1, 1);
    const domainRange = Math.max(domainMax - domainMin, 1);
    points.forEach((point, index) => {
      if (typeof point[field] !== "number") {
        if (segment.length > 0) segments.push(segment);
        segment = [];
        return;
      }
      const x = plotLeft + index / denominator * plotWidth;
      const normalized = (point[field] - domainMin) / domainRange;
      const y = Math.min(132, Math.max(12, 132 - normalized * 120));
      segment.push({
        x,
        y
      });
    });
    if (segment.length > 0) segments.push(segment);
    return segments;
  };
  const renderLineSegments = (segments, strokeClass, markerClass) => segments.flatMap((segment, segmentIndex) => {
    const elements = [];
    if (segment.length > 1) {
      elements.push(<polyline key={`${strokeClass}-${segmentIndex}`} points={segment.map(({x, y}) => `${x},${y}`).join(" ")} className={`fill-none ${strokeClass}`} stroke="currentColor" strokeWidth="2" />);
    }
    if (segment.length === 1) {
      const [{x, y}] = segment;
      elements.push(<circle key={`${strokeClass}-${segmentIndex}-isolated`} cx={x} cy={y} r="2" className={markerClass} />);
    }
    return elements;
  });
  useEffect(() => {
    const controller = new AbortController();
    const url = `https://openrouter.ai/api/frontend/v1/stats/model-uptime-recent?permaslug=${encodeURIComponent(permaslug)}`;
    fetch(url, {
      signal: controller.signal
    }).then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))).then(body => {
      if (body.data === null || body.data === undefined) {
        throw new Error("Missing uptime data");
      }
      setUptime(body.data);
    }).catch(err => {
      if (err.name !== "AbortError") setDidError(true);
    });
    return () => controller.abort();
  }, [permaslug]);
  if (didError) {
    return <p>Uptime data could not be retrieved at this time.</p>;
  }
  if (uptime === null) {
    return <div className="bg-muted h-80 w-full animate-pulse rounded-lg" />;
  }
  const hourly = Array.isArray(uptime.hourly) ? uptime.hourly : [];
  const buckets = Array.isArray(uptime.buckets) ? uptime.buckets : [];
  const hasAvailabilityData = typeof uptime.availability === "number" || hourly.some(point => typeof point.availability === "number") || buckets.some(bucket => typeof bucket.availability === "number");
  if (!hasAvailabilityData) {
    return <p>Not enough uptime data to display yet.</p>;
  }
  const chartId = permaslug.replace(/[^a-zA-Z0-9_-]/g, "-");
  const hasAvailabilityWithoutRouting = buckets.some(bucket => typeof bucket.availabilityWithoutRouting === "number");
  const hourlyBarWidth = hourly.length === 0 ? 0 : 100 / hourly.length;
  const recentPlotLeft = 80;
  const recentPlotWidth = 720;
  const recentViewBoxWidth = recentPlotLeft + recentPlotWidth;
  const recentDomain = getRecentDomain(buckets, ["availability", "availabilityWithoutRouting"]);
  const recentSegments = getLineSegments(buckets, "availability", recentDomain.min, recentDomain.max, recentPlotLeft, recentPlotWidth);
  const withoutRoutingSegments = hasAvailabilityWithoutRouting ? getLineSegments(buckets, "availabilityWithoutRouting", recentDomain.min, recentDomain.max, recentPlotLeft, recentPlotWidth) : [];
  return <div className="flex w-full flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-muted-foreground text-sm">Availability over the last 3 days</p>
        {typeof uptime.availability === "number" ? <p className="text-lg font-semibold tabular-nums">
            Availability {formatPercent(uptime.availability)}
          </p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Hourly availability</h3>
        <svg viewBox="0 0 720 48" className="h-12 w-full" role="img" aria-labelledby={`${chartId}-uptime-hourly-title`}>
          <title id={`${chartId}-uptime-hourly-title`}>
            Hourly availability over the last 3 days
          </title>
          {hourly.map((point, index) => <rect key={point.timestamp} x={`${index * hourlyBarWidth}%`} y="0" width={`${Math.max(hourlyBarWidth - 0.3, 0)}%`} height="48" className={getAvailabilityFillClass(point.availability)} fillOpacity={point.availability === null ? 0.2 : 0.95} />)}
        </svg>
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>{formatTimestamp(hourly[0]?.timestamp)}</span>
          <span>{formatTimestamp(hourly.at(-1)?.timestamp)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Availability over the last 24 hours</h3>
        <svg viewBox={`0 0 ${recentViewBoxWidth} 160`} className="h-40 w-full" role="img" aria-labelledby={`${chartId}-uptime-recent-title`}>
          <title id={`${chartId}-uptime-recent-title`}>
            Availability over the last 24 hours, including availability without routing when available
          </title>
          <line x1={recentPlotLeft} x2={recentViewBoxWidth} y1="12" y2="12" className="text-gray-400" stroke="currentColor" strokeDasharray="3 3" />
          <line x1={recentPlotLeft} x2={recentViewBoxWidth} y1="72" y2="72" className="text-gray-400" stroke="currentColor" strokeDasharray="3 3" />
          <line x1={recentPlotLeft} x2={recentViewBoxWidth} y1="132" y2="132" className="text-gray-400" stroke="currentColor" strokeDasharray="3 3" />
          <text x={recentPlotLeft - 8} y="17" textAnchor="end" fontSize="14" className="text-gray-500" fill="currentColor">
            {formatPercent(recentDomain.max)}
          </text>
          <text x={recentPlotLeft - 8} y="77" textAnchor="end" fontSize="14" className="text-gray-500" fill="currentColor">
            {formatPercent((recentDomain.min + recentDomain.max) / 2)}
          </text>
          <text x={recentPlotLeft - 8} y="137" textAnchor="end" fontSize="14" className="text-gray-500" fill="currentColor">
            {formatPercent(recentDomain.min)}
          </text>
          {renderLineSegments(recentSegments, "text-green-500", "fill-current text-green-500")}
          {renderLineSegments(withoutRoutingSegments, "text-yellow-600", "fill-current text-yellow-600")}
        </svg>
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>{formatTimestamp(buckets[0]?.timestamp)}</span>
          <span>{formatTimestamp(buckets.at(-1)?.timestamp)}</span>
        </div>
        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <span>
            <span className="mr-1 inline-block size-2 rounded-full bg-green-500" aria-hidden="true" />
            OpenRouter Availability
          </span>
          {hasAvailabilityWithoutRouting && <span>
              <span className="mr-1 inline-block size-2 rounded-full bg-yellow-600" aria-hidden="true" />
              Without Routing
            </span>}
        </div>
      </div>

      <div className="sr-only">
        <p>
          Three-day aggregate: availability {formatPercent(uptime.availability)}, uptime{" "}
          {formatPercent(uptime.uptime)}.
        </p>
        <p>Hourly availability values:</p>
        <ul>
          {hourly.map(point => <li key={`hourly-${point.timestamp}`}>
              {point.timestamp}: {formatPercent(point.availability)}
            </li>)}
        </ul>
        <p>Recent availability values:</p>
        <ul>
          {buckets.map(bucket => <li key={`recent-${bucket.timestamp}`}>
              {bucket.timestamp}: availability {formatPercent(bucket.availability)}
              {hasAvailabilityWithoutRouting && `, without routing ${formatPercent(bucket.availabilityWithoutRouting)}`}
            </li>)}
        </ul>
      </div>
      <p className="text-muted-foreground text-xs">
        When an error occurs in an upstream provider, we can recover by routing to another healthy
        provider, if your request filters allow it. You can access per-provider uptime data
        programmatically through the{" "}
        <a href="https://openrouter.ai/docs/api/api-reference/endpoints/list-endpoints">
          Endpoints API
        </a>
        .{" "}
        <a href="https://openrouter.ai/docs/provider-routing">Learn more</a> about our load balancing
        and customization options.
      </p>
    </div>;
};

OpenRouter continuously monitors the health and availability of AI providers to ensure maximum uptime for your applications. We track response times, error rates, and availability across all providers in real-time, and route based on this feedback.

## How It Works

OpenRouter tracks response times, error rates, and availability across all providers in real-time. This data helps us make intelligent routing decisions and provides transparency about service reliability.

## Uptime Example: Claude Sonnet 4.6

<UptimeChart permaslug="anthropic/claude-4.6-sonnet-20260217" />

## Uptime Example: GLM 5.1

<UptimeChart permaslug="z-ai/glm-5.1-20260406" />

## Customizing Provider Selection

While our smart routing helps maintain high availability, you can also customize provider selection using request parameters. This gives you control over which providers handle your requests while still benefiting from automatic fallback when needed.

Learn more about customizing provider selection in our [Provider Routing documentation](/docs/guides/routing/provider-selection).
