import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const apUrl = "https://gateway.testnet.thegraph.com/api/[api-key]/subgraphs/id/";
const APIKEY = "64dac5ccee0fe7ffbbdafecb5e37ff28";
const APIENDPOINT = "9M2HP1iLbJDxePzbi7BtRbMtqE6ZkutcQR1ew7U3D4qG";

const APIURL = "https://gateway.testnet.thegraph.com/api/".concat(APIKEY, "/subgraphs/id/", APIENDPOINT);

export default function runGql() {
    const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
    });

    const historicalWinners = `
            query HistoricalWinners($blockTimestampFrom: BigInt, $blockTimestampTo: BigInt) {
                auctionSettleds(
                    where: {blockTimestamp_gte: $blockTimestampFrom, blockTimestamp_lte: $blockTimestampTo}
                ) {
                    winner
                    FLUIDnftId
                    blockNumber
                    amount
                    id
                    blockTimestamp
                    transactionHash
                }
            }
        `;

    const allBidsPerId = `
        query AllBidsPerId ($FLUIDnftId: Int) {
            auctionBids(where: {FLUIDnftId: $FLUIDnftId}) {
                FLUIDnftId
                blockTimestamp
                blockNumber
                id
                extended
                sender
                transactionHash
                value
            }
        }
    `;

    const userBidHistory = `
        query UserBidHistory($sender: String) {
            auctionBids(where: {sender: $sender}) {
                FLUIDnftId
                blockTimestamp
                blockNumber
                id
                extended
                sender
                transactionHash
                value
            }
        }
    `

    client.query({
        query: gql(historicalWinners),
        variables: {
            blockTimestampFrom: 1660000000,
            blockTimestampTo: 1670000000
        },
    }).then((data) => console.log('Subgraph data: ', data)).catch((err) => {
        console.log('Error fetching data: ', err)
    });

    client.query({
        query: gql(allBidsPerId),
        variables: {
            FLUIDnftId: 4
        },
    }).then((data) => console.log('Subgraph data: ', data)).catch((err) => {
        console.log('Error fetching data: ', err)
    });

    client.query({
        query: gql(userBidHistory),
        variables: {
            sender: "0xc4339be0780a5922007919d19d39cc02234d68bf"
        },
    }).then((data) => console.log('Subgraph data: ', data)).catch((err) => {
        console.log('Error fetching data: ', err)
    });
}
