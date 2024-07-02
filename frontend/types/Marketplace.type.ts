enum MarketplaceAction {
    SELL,
    REMOVE,
    BUY,
}

export type Bid = {
    animalId: bigint
    price: bigint
    owner: string
}

export type MarketplaceChangeEvent = {
    action: MarketplaceAction
    bid: Bid
    date: bigint
    sender: string
}

export function formatMarketplaceAction(action: MarketplaceAction) {
    switch (action) {
        case MarketplaceAction.SELL:
            return 'SELL'
        case MarketplaceAction.REMOVE:
            return 'REMOVE'
        case MarketplaceAction.BUY:
            return 'BUY'
        default:
            return '???'
    }
}
