import { Button, Flex } from "@fluentui/react-northstar";
import { app, barCode } from "@microsoft/teams-js";

import { booleanToString } from "../../helpers";
import { isMobile } from "react-device-detect";

/**
 * This component returns button to scan barcode
 */
export const BarCode = () => {
  // Check if app is initialized
  if (app.isInitialized()) {
    // check to see if capability is supported
    if (barCode.isSupported()) {
      // return button to scan barcode
      return (
        <Flex gap="gap.small" className={isMobile ? "ui_flex_button_mobile" : ""} vAlign="center">
          <Button
            onClick={async () => {
              await barCode.hasPermission();
            }}
          >
            Bar code has permission
          </Button>
          <Button
            onClick={async () => {
              await barCode.requestPermission();
            }}
          >
            Bar code requests permission
          </Button>
          <Button
            onClick={async () => {
              const scanString = await barCode.scanBarCode({
                timeOutIntervalInSec: 30000,
              });
              console.log("Scan string", scanString);
            }}
          >
            Scan Bar Code
          </Button>
        </Flex>
      );
    }
  }
  // return's if capability is not supported
  return <Flex gap="gap.small" className={isMobile ? "ui_flex_button_mobile" : ""} vAlign="center">Capability is not supported</Flex>;;
};

export const BarCodeIsSupported = () => booleanToString(barCode.isSupported());
