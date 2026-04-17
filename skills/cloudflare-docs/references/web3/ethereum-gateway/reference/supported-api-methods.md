---
title: Supported API methods
description: Ethereum JSON-RPC methods supported by the Cloudflare gateway.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/ethereum-gateway/reference/supported-api-methods.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Supported API methods

The full list of API methods that are supported by an Ethereum Gateway is given below. The gateway returns a `403` if a method is specified that is not supported.

For a full list of JSON-RPC API methods, refer to the [JSON-RPC specification ↗](https://github.com/ethereum/execution-apis).

| JSON-RPC method                                                                                                                                | Cloudflare Ethereum Gateway support |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| [web3\_clientVersion ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#web3%5Fclientversion)                                           | ✅                                   |
| [web3\_sha3 ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#web3%5Fsha3)                                                             | ✅                                   |
| [net\_version ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#net%5Fversion)                                                         | ✅                                   |
| [net\_listening ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#net%5Flistening)                                                     | ✅                                   |
| [eth\_syncing ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fsyncing)                                                         | ✅                                   |
| [eth\_mining ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fmining)                                                           | ✅                                   |
| [eth\_gasPrice ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgasprice)                                                       | ✅                                   |
| [eth\_feeHistory ↗](https://github.com/ethereum/execution-apis)[1](#user-content-fn-2)                                                         | ✅                                   |
| [eth\_blockNumber ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fblocknumber)                                                 | ✅                                   |
| [eth\_chainId ↗](https://github.com/ethereum/execution-apis)                                                                                   | ✅                                   |
| [eth\_getBalance ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetbalance)                                                   | ✅                                   |
| [eth\_getStorageAt ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetstorageat)                                               | ✅                                   |
| [eth\_getTransactionCount ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgettransactioncount)                                 | ✅                                   |
| [eth\_getBlockTransactionCountByHash ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetblocktransactioncountbyhash)           | ✅                                   |
| [eth\_getBlockTransactionCountByNumber ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetblocktransactioncountbynumber)       | ✅                                   |
| [eth\_getUncleCountByBlockHash ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetunclecountbyblockhash)                       | ✅                                   |
| [eth\_getUncleCountByBlockNumber ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetunclecountbyblocknumber)                   | ✅                                   |
| [eth\_getCode ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetcode)                                                         | ✅                                   |
| [eth\_sendRawTransaction ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fsendrawtransaction)                                   | ✅                                   |
| [eth\_call ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fcall)                                                               | ✅                                   |
| [eth\_estimateGas ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Festimategas)                                                 | ✅                                   |
| [eth\_getBlockByHash ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetblockbyhash)                                           | ✅                                   |
| [eth\_getBlockByNumber ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetblockbynumber)                                       | ✅                                   |
| [eth\_getTransactionByHash ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgettransactionbyhash)                               | ✅                                   |
| [eth\_getTransactionByBlockHashAndIndex ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgettransactionbyblockhashandindex)     | ✅                                   |
| [eth\_getTransactionByBlockNumberAndIndex ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgettransactionbyblocknumberandindex) | ✅                                   |
| [eth\_getTransactionReceipt ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgettransactionreceipt)                             | ✅                                   |
| [eth\_getUncleByBlockHashAndIndex ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetunclebyblockhashandindex)                 | ✅                                   |
| [eth\_getUncleByBlockNumberAndIndex ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetunclebyblocknumberandindex)             | ✅                                   |
| [eth\_getLogs ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetlogs)[2](#user-content-fn-1)                                  | ✅                                   |
| [eth\_getWork ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetwork)                                                         | ✅                                   |
| [eth\_getProof ↗](https://ethereum.github.io/execution-apis/api-documentation/)                                                                | ✅                                   |
| [net\_peerCount ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#net%5Fpeercount)                                                     | ❌                                   |
| [eth\_protocolVersion ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fprotocolversion)                                         | ❌                                   |
| [eth\_coinbase ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fcoinbase)                                                       | ❌                                   |
| [eth\_hashrate ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fhashrate)                                                       | ❌                                   |
| [eth\_accounts ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Faccounts)                                                       | ❌                                   |
| [eth\_sign ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fsign)                                                               | ❌                                   |
| [eth\_sendTransaction ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fsendtransaction)                                         | ❌                                   |
| [eth\_getCompilers ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetcompilers)                                               | ❌                                   |
| [eth\_compileLLL ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fcompilelll)                                                   | ❌                                   |
| [eth\_compileSolidity ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fcompile%5Fsolidity)                                      | ❌                                   |
| [eth\_compileSerpent ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fcompileserpent)                                           | ❌                                   |
| [eth\_newFilter ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fnewfilter)                                                     | ❌                                   |
| [eth\_newBlockFilter ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fnewblockfilter)                                           | ❌                                   |
| [eth\_newPendingTransactionFilter ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fnewpendingtransactionfilter)                 | ❌                                   |
| [eth\_uninstallFilter ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Funinstallfilter)                                         | ❌                                   |
| [eth\_getFilterChanges ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetfilterchanges)                                       | ❌                                   |
| [eth\_getFilterLogs ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetfilterlogs)                                             | ❌                                   |
| [eth\_submitWork ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fsubmitwork)                                                   | ❌                                   |
| [eth\_submitHashrate ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fsubmithashrate)                                           | ❌                                   |

## Trace methods

EVM traces are a way to track the execution of smart contracts on the Ethereum blockchain. It records all the steps taken by the Ethereum Virtual Machine (EVM) as it runs the smart contract. This includes information like the specific operation that was executed, how much gas it cost, and any changes made to the blockchain as a result. The trace module is a tool that allows developers to access and analyze these traces, which can be useful for debugging, testing, and monitoring smart contracts. It can be used to identify and fix errors, optimize performance, and gain insight into how the smart contract is interacting with the blockchain.

### trace\_filter

The `trace_filter` method retrieves the traces of multiple transactions in a single request. This method is particularly useful for debugging and monitoring specific addresses on the Ethereum blockchain.

#### Request Parameters

* `fromBlock`: `Quantity` or `Tag` \- (optional) The block number to start receiving traces from.
* `toBlock`: `Quantity` or `Tag` \- (optional) The block number to stop receiving traces at.
* `fromAddress`: `Array` \- (optional) An array of addresses to start receiving traces from.
* `toAddress`: `Address` \- (optional) An array of addresses to stop retrieving traces at.
* `after`: `Quantity` \- (optional) The offset trace number
* `count`: `Quantity` \- (optional) The amount of traces to return.

#### Returns

This method returns an `Array` of traces matching the given filter.

#### Example

trace\_filter Request

```

curl https://web3-trial.cloudflare-eth.com/v1/mainnet \

-X POST \

-H 'Content-Type: application/json' \

--data '{

    "jsonrpc":"2.0",

    "method":"trace_filter",

    "params":[

        {

            "count": 200,

            "fromBlock": "0xccb943",

            "toBlock": "0xccbc62",

            "fromAddress": [

                "0xEdC763b3e418cD14767b3Be02b667619a6374076"

            ]

        }

    ],

    "id":1

    }'


```

Explain Code

#### Response

```

{

  "jsonrpc": "2.0",

  "result": [

    {

      "action": {

        "from": "0xedc763b3e418cd14767b3be02b667619a6374076",

        "callType": "call",

        "gas": "0x8462",

        "input": "0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",

        "to": "0x7ff4169a6b5122b664c51c95727d87750ec07c84",

        "value": "0x0"

      },

      "blockHash": "0x351e7c06ec010c8f7e7358eb580238dd23e1e129be96822aa93ebb6da08558e6",

      "blockNumber": 13416771,

      "result": {

        "gasUsed": "0x6009",

        "output": "0x0000000000000000000000000000000000000000000000000000000000000001"

      },

      "subtraces": 0,

      "traceAddress": [],

      "transactionHash": "0x054bbb9fbb855bf23f755e548c7409f45fc5eff8a824b2ad06380bc038d7b049",

      "transactionPosition": 54,

      "type": "call"

    }

  ],

  "id": 1

}


```

Explain Code

### Limitations

The `trace_filter` method has some limitations to ensure that our nodes are not overloaded.

* The block range for the `trace_filter` method is limited to 800 blocks.
* The trace `count` is limited to 200

## Footnotes

1. **Limitations**: Max block count of 10\. [↩](#user-content-fnref-2)
2. **Limitations**: Max block range of 800 blocks. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/ethereum-gateway/","name":"Ethereum Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/ethereum-gateway/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/web3/ethereum-gateway/reference/supported-api-methods/","name":"Supported API methods"}}]}
```
