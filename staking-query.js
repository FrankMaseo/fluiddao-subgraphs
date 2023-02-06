const query = `
  query stakingHistory($blockTimestamp_gte: BigInt = "16000000", $blockTimestamp_lte: BigInt = "9999999999999", $user: Bytes = "0x87a23309d279db2eef6bba7cae04ebffb2314800") {
  rewardPaids(
    where: {blockTimestamp_gte: $blockTimestamp_gte, blockTimestamp_lte: $blockTimestamp_lte, user: $user}
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    blockTimestamp
    reward
    transactionHash
    user
    id
    blockNumber
  }
  stakeds(
    where: {user: $user, blockTimestamp_gte: $blockTimestamp_gte, blockTimestamp_lte: $blockTimestamp_lte}
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    amount
    blockNumber
    blockTimestamp
    id
    transactionHash
    user
  }
  withdrawns(
    where: {user: $user, blockTimestamp_gte: $blockTimestamp_gte, blockTimestamp_lte: $blockTimestamp_lte}
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    amount
    blockNumber
    blockTimestamp
    id
    transactionHash
    user
  }
}
`