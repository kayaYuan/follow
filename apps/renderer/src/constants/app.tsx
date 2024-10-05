import { getStorageNS } from "~/lib/ns"

/// Feed
export const FEED_COLLECTION_LIST = "collections"
/// Local storage keys
export const QUERY_PERSIST_KEY = getStorageNS("REACT_QUERY_OFFLINE_CACHE")
export const I18N_LOCALE_KEY = getStorageNS("I18N_LOCALE")

/// Route Keys
export const ROUTE_FEED_PENDING = "all"
export const ROUTE_ENTRY_PENDING = "pending"
export const ROUTE_FEED_IN_FOLDER = "folder-"
export const ROUTE_FEED_IN_LIST = "list-"
export const ROUTE_FEED_IN_INBOX = "inbox-"

export const DAILY_CLAIM_AMOUNT = "20"
export const INVITATION_PRICE = "100"