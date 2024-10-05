import type { FC, ReactNode } from "react"
import { memo } from "react"

import { LoadingCircle } from "~/components/ui/loading"
import { views } from "~/constants"
import { useAuthQuery } from "~/hooks/common"
import type { FeedViewType } from "~/lib/enum"
import { FeedViewType as FeedViewTypeEnum } from "~/lib/enum"
import { cn } from "~/lib/utils"
import { Queries } from "~/queries"
import type { FlatEntryModel } from "~/store/entry"
import { useEntry } from "~/store/entry/hooks"

import { ReactVirtuosoItemPlaceholder } from "../../components/ui/placeholder"
import { getItemComponentByView, getSkeletonItemComponentByView } from "./Items"
import { EntryItemWrapper } from "./layouts/EntryItemWrapper"
import { girdClassNames } from "./styles"
import type { EntryListItemFC } from "./types"

interface EntryItemProps {
  entryId: string
  view?: number
}
function EntryItemImpl({ entry, view }: { entry: FlatEntryModel; view?: number }) {
  const translation = useAuthQuery(
    Queries.ai.translation({
      entry,
      view,
      language: entry.settings?.translation,
    }),
    {
      enabled: !!entry.settings?.translation,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      meta: {
        persist: true,
      },
    },
  )

  const Item: EntryListItemFC = getItemComponentByView(view as FeedViewType)
  const overlayItemClassName =
    view === FeedViewTypeEnum.Pictures || view === FeedViewTypeEnum.Videos ? "top-0" : ""

  return (
    <EntryItemWrapper
      itemClassName={Item.wrapperClassName}
      entry={entry}
      view={view}
      overlay
      overlayItemClassName={overlayItemClassName}
    >
      <Item entryId={entry.entries.id} translation={translation.data} />
    </EntryItemWrapper>
  )
}

export const EntryItem: FC<EntryItemProps> = memo(({ entryId, view }) => {
  const entry = useEntry(entryId)
  if (!entry) return <ReactVirtuosoItemPlaceholder />
  return <EntryItemImpl entry={entry} view={view} />
})

const LoadingCircleFallback = (
  <div className="center mt-2">
    <LoadingCircle size="medium" />
  </div>
)

export const EntryItemSkeleton: FC<{
  view: FeedViewType
  count?: number
}> = memo(({ view, count }) => {
  const SkeletonItem = getSkeletonItemComponentByView(view)
  if (count === 1) {
    return SkeletonItem
  }

  return SkeletonItem ? (
    <div className={cn(views[view].gridMode ? girdClassNames : "flex flex-col")}>
      {createSkeletonItems(SkeletonItem, count || 10)}
    </div>
  ) : (
    LoadingCircleFallback
  )
})

const createSkeletonItems = (element: ReactNode, count: number) => {
  const children = [] as ReactNode[]
  for (let i = 0; i < count; i++) {
    children.push(element)
  }
  return children
}