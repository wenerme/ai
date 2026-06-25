---
title: "Holidays and seasonality | Grafana Plugins documentation"
description: "Create Holiday occurrences in Grafana AI"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Holidays and seasonality

Forecasts automatically detect some levels of seasonality within your data. Some data may trend toward patterns of seasonality without being explicitly registered as seasonality. Examples may include:

- Data backups configured to run on the last day of the month.
- Spikes in traffic associated with sales periods, advertising campaigns, or other marketing events which can be added arbitrarily.
- Holidays that occur on different dates each year, such as Easter or Black Friday.
- Public holidays and bank holidays that are observed regionally.

If trends of seasonality aren’t explicitly handled, one of two things can happen:

1. When training, the model assumes any associated spikes are part of the automatically handled seasonalities, resulting in biased predictions.
2. The model cannot correctly account for spikes associated with recurring holiday dates, resulting in inaccurate predictions and spuriously triggered alerts.

## About Holidays

A Holiday is a collection of time ranges known as **Holiday Occurrences**. Holiday Occurrences are expected to behave similarly within the group, but differently from ’normal’ behavior. Grafana Machine Learning allows you to manually create ‘Holidays’ and add them to your forecasts.

Consider the examples above, the corresponding holidays and occurrences would be:

Expand table

| Holiday          | Occurrences                                |
|------------------|--------------------------------------------|
| Data Backups     | Data Backup Jan 2022, Data Backup Feb 2022 |
| Ad Campaigns     | Summer Sale 2022, New Fall range 2022      |
| Easter           | Easter weekend 2021, Easter weekend 2022   |
| UK Bank Holidays | Good Friday 2022, Easter Monday 2022       |

Use Holidays to train forecast models better and improve prediction accuracy. Holidays indicate to the model that particular spikes are related to a holiday and account for any occurrences during a prediction period.

## Create a Holiday

1. In the Grafana Cloud main menu, select **AI &amp; machine mearning**.
2. From the AI &amp; machine learning homepage, navigate to the **Holidays** tab and click **+ Holiday**.
3. Give your holiday a name and a description.
4. Choose whether to manually add holiday occurrences or use an iCal calendar URL.
5. Select the time zone to use for all day events.
6. Optional: Link to an existing forecast for which this holiday is relevant to ensure that the predictions from those forecasts account for the new holiday.
7. Click **Save**.

### Manually

1. In the Holiday source section of the creation page, select **Manual**.
2. Provide a **Holiday occurrence name** along with start and end dates.
3. Click **+ Add Holiday** and repeat for each occurrence in your group.

### Use an iCal URL

Use your existing calendar software, such as Microsoft Outlook, Google Calendar, or MacOS calendar, to define your holiday. This configuration allows holidays to be managed and edited in your preferred calendar tool. Any updates to the iCal will be accounted for when the forecast model is retrained each day.

To use this option, create a new public calendar using your software of choice and add events to the calendar as usual. Events can be either ‘All day’ or have specific start and end times. Grafana Machine Learning will include all events from this iCal in the holiday.

1. In the Holiday source section of the creation page, select **iCal URL**.
2. Add a publicly accessible iCal URL to the **iCal URL** field.

> Note
>
> ‘All day’ events in the iCal will be assumed to last 24 hours starting from midnight in the selected Timezone.

## Link Holidays to a Forecast

To use your Holiday in a forecast, link the two together when creating or editing a forecast.

1. In Step 2 of the forecast creation or edit page (**Preview and tune the forecast**), expand the **Holidays** section.
2. From the dropdown, select the holidays you wish to link with the forecast.
3. Continue to create or update your forecast as usual.

Your forecast will now account for occurrences of the linked holiday during training and prediction.

## FAQ

### My forecast has a holiday linked, but the future predictions for occurrence times are unaffected

Ensure that your holiday has some occurrences in the past and within the forecast’s training window. For your forecast to account for the linked holiday, the model must have ‘seen’ some occurrences in the training data. If your holiday only contains future occurrences or occurrences earlier than your forecast’s training window, then future predictions will be unaffected.

Suppose this isn’t possible because there are no past occurrences. In that case, the forecast will automatically begin to account for future occurrences correctly once the first event has been ‘passed’ in time and is within the training data.
