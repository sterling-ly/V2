/* eslint-disable @typescript-eslint/no-unused-vars */
import { Trans } from '@lingui/macro'
import { Trace, TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, InterfaceElementName, InterfacePageName, SharedEventName } from '@uniswap/analytics-events'
import { BaseButton } from 'components/Button'
import { useSwapWidgetEnabled } from 'featureFlags/flags/swapWidget'
import { useAtomValue } from 'jotai/utils'
import Swap from 'pages/Swap'
import { parse } from 'qs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link as NativeLink } from 'react-router-dom'
import { shouldDisableNFTRoutesAtom } from 'state/application/atoms'
import { useAppSelector } from 'state/hooks'
import styled, { css } from 'styled-components/macro'
import { BREAKPOINTS } from 'theme'
import { useIsDarkMode } from 'theme/components/ThemeToggle'
import { Z_INDEX } from 'theme/zIndex'

const PageContainer = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  top: 0;
  padding: ${({ theme }) => theme.navHeight}px 0px 0px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-behavior: smooth;
  overflow-x: hidden;

  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'linear-gradient(to right, #e96443, #e2ee9b);'
      : 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255 255 255 /100%) 45%)'};
`

const Gradient = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  width: 100%;
  min-height: 550px;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'radial-gradient(ellipse at top, rgba(225,238,195,1) 0%, rgba(240,80,83,1) 100%)'
      : 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255 255 255 /100%) 45%)'};
  z-index: ${Z_INDEX.under_dropdown};
  pointer-events: none;
  height: ${({ theme }) => `calc(100vh - ${theme.mobileBottomBarHeight}px)`};
  @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    height: 100vh;
  }
`

const GlowContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: hidden;
  height: ${({ theme }) => `calc(100vh - ${theme.mobileBottomBarHeight}px)`};
  @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    height: 100vh;
  }
`

const Glow = styled.div`
  position: absolute;
  top: 68px;
  bottom: 0;
  background: radial-gradient(ellipse at top, rgba(225, 238, 195, 1) 0%, rgba(240, 80, 83, 1) 100%);
  filter: blur(72px);
  border-radius: 24px;
  max-width: 480px;
  width: 100%;
  height: 100%;
`

const ContentContainer = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0 0 40px;
  max-width: min(720px, 90%);
  min-height: 500px;
  z-index: ${Z_INDEX.under_dropdown};
  transition: ${({ theme }) => `${theme.transition.duration.medium} ${theme.transition.timing.ease} opacity`};
  height: ${({ theme }) => `calc(100vh - ${theme.navHeight + theme.mobileBottomBarHeight}px)`};
  pointer-events: none;
  * {
    pointer-events: auto;
  }
`

const TitleText = styled.h1<{ isDarkMode: boolean }>`
  color: transparent;
  font-size: 36px;
  line-height: 44px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 24px;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'linear-gradient(20deg, rgba(132, 74, 90, 1) 10%, rgba(240, 80, 83, 1) 100%)' // rgb(132, 74, 90) / rgb(240, 80, 83)
      : 'linear-gradient(10deg, rgba(255,79,184,1) 0%, rgba(255,159,251,1) 100%)'};
  background-clip: text;
  -webkit-background-clip: text;

  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    font-size: 48px;
    line-height: 56px;
  }

  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    font-size: 64px;
    line-height: 72px;
  }
`

const SubText = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  margin: 0 0 32px;

  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    font-size: 20px;
    line-height: 28px;
  }
`

const SubTextContainer = styled.div`
  display: flex;
  justify-content: center;
`

const LandingButton = styled(BaseButton)`
  padding: 16px 0px;
  border-radius: 24px;
`

const MigrateButton = styled(BaseButton)`
  padding: 16px 0px;
  border-radius: 24px;
`

const ButtonCTA = styled(MigrateButton)`
  margin: 10px;
  background: linear-gradient(93.06deg, #f05053 2.66%, #844a5a 98.99%);
  border: none;
  color: ${({ theme }) => theme.white};
  transition: ${({ theme }) => `all ${theme.transition.duration.medium} ${theme.transition.timing.ease}`};

  &:hover {
    box-shadow: 0px 0px 16px 0px #634f98;
  }
`
const MigrateCTA = styled(MigrateButton)`
  margin: 10px;
  background: linear-gradient(93.06deg, #f05053 2.66%, #844a5a 98.99%);
  border: none;
  color: ${({ theme }) => theme.white};
  transition: ${({ theme }) => `all ${theme.transition.duration.medium} ${theme.transition.timing.ease}`};

  &:hover {
    box-shadow: 0px 0px 16px 0px #634f98;
  }
`
const MigrateCTAText = styled.p`
  margin: 0px;
  font-size: 16px;
  font-weight: 600;
  white-space: wrap;

  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    font-size: 20px;
  }
`
const ButtonCTAText = styled.p`
  margin: 0px;
  font-size: 16px;
  font-weight: 600;
  white-space: wrap;

  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    font-size: 20px;
  }
`

const ActionsContainer = styled.span`
  max-width: 300px;
  width: 100%;
  pointer-events: auto;
`

const LandingSwapContainer = styled.div`
  height: ${({ theme }) => `calc(100vh - 72px)`};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

const SwapCss = css`
  * {
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    transition: ${({ theme }) => `transform ${theme.transition.duration.medium} ${theme.transition.timing.ease}`};
  }
`

const LinkCss = css`
  text-decoration: none;
  max-width: 480px;
  width: 100%;
`

const LandingSwap = styled(Swap)`
  ${SwapCss}
  &:hover {
    border: 1px solid ${({ theme }) => theme.accentAction};
  }
`

const Link = styled(NativeLink)`
  ${LinkCss}
`

const WidgetLandingLink = styled(NativeLink)`
  ${LinkCss}
  ${SwapCss}
`

export default function Landing() {
  const isDarkMode = useIsDarkMode()

  const [showContent, setShowContent] = useState(false)
  const selectedWallet = useAppSelector((state) => state.user.selectedWallet)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = parse(location.search, {
    ignoreQueryPrefix: true,
  })

  const swapWidgetEnabled = useSwapWidgetEnabled()

  // This can be simplified significantly once the flag is removed! For now being explicit is clearer.
  useEffect(() => {
    if (queryParams.intro || !selectedWallet) {
      setShowContent(true)
    } else {
      navigate('/swap')
    }
  }, [navigate, selectedWallet, queryParams.intro])

  const shouldDisableNFTRoutes = useAtomValue(shouldDisableNFTRoutesAtom)

  return (
    <Trace page={InterfacePageName.LANDING_PAGE} shouldLogImpression>
      {showContent && (
        <PageContainer isDarkMode={isDarkMode} data-testid="landing-page">
          <LandingSwapContainer></LandingSwapContainer>
          <Gradient isDarkMode={isDarkMode} />
          <GlowContainer>
            <Glow />
          </GlowContainer>
          <ContentContainer isDarkMode={isDarkMode}>
            <TitleText isDarkMode={isDarkMode}>
              {shouldDisableNFTRoutes ? <Trans>MINERVA</Trans> : <Trans>Minerva</Trans>}
            </TitleText>
            <SubTextContainer>
              <SubText>{shouldDisableNFTRoutes ? <Trans>Sterling v2</Trans> : <Trans>Sterling</Trans>}</SubText>
            </SubTextContainer>
            <ActionsContainer>
              <TraceEvent
                events={[BrowserEvent.onClick]}
                name={SharedEventName.ELEMENT_CLICKED}
                element={InterfaceElementName.CONTINUE_BUTTON}
              >
                <ButtonCTA as={Link} to="/swap">
                  <ButtonCTAText>Enter</ButtonCTAText>
                </ButtonCTA>
              </TraceEvent>
            </ActionsContainer>
            <ActionsContainer>
              <TraceEvent
                events={[BrowserEvent.onClick]}
                name={SharedEventName.ELEMENT_CLICKED}
                element={InterfaceElementName.CONTINUE_BUTTON}
              >
                <MigrateCTA as={Link} to="">
                  <MigrateCTAText>Migrate</MigrateCTAText>
                </MigrateCTA>
              </TraceEvent>
            </ActionsContainer>
          </ContentContainer>
        </PageContainer>
      )}
    </Trace>
  )
}
