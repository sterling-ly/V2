/* eslint-disable import/no-unused-modules */
import { Trans } from '@lingui/macro'
//import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

export default function PrivacyPolicyNotice() {
  return (
    <ThemedText.Caption color="textSecondary">
      <Trans>Trade responsibly</Trans>
    </ThemedText.Caption>
  )
}
