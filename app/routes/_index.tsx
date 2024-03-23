import {ShouldRevalidateFunction} from '@remix-run/react'
import {ContentBoxMain, ContentBoxSecond, ContentBoxThird} from '~/components/ContentBox'
import useToC from '~/hooks/useToC'
import Grid from '~/components/Grid'
import Page from '~/components/Page'

export const shouldRevalidate: ShouldRevalidateFunction = () => false

export default function App() {
  const {advanced} = useToC()
  return (
    <Page>
      <div className="page-body">
        <h1 className="padding-bottom-80 padding-top-56">Your guide to AI safety</h1>

        <ContentBoxMain />
        <ContentBoxSecond />
        <ContentBoxThird />

        <div className="desktop-only padding-bottom-56" />
        {/* <WidgetStampy /> */}

        <h3 className="grey large-bold padding-bottom-32">Advanced sections</h3>
        <Grid gridBoxes={advanced} />
      </div>
    </Page>
  )
}
