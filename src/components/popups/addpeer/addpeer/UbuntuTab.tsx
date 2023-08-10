import React, { useState } from "react";
import { StepCommand } from "./types";
import { formatMilianUP } from "./common";
import SyntaxHighlighter from "react-syntax-highlighter";
import TabSteps from "./TabSteps";
import { Typography, Button } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { copyToClipboard } from "../../../../utils/common";

const { Title, Paragraph, Text } = Typography;

export const UbuntuTab = () => {
  const [copied, setCopied] = useState(false);

  const [steps, setSteps] = useState([
    {
      key: 1,
      title: "Add repository",
      commands: [
        `sudo apt install ca-certificates curl gnupg -y`,
        `curl -L https://pkgs.keyrotate.com/debian/public.key | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/milian.gpg`,
        `echo 'deb https://pkgs.keyrotate.com/debian stable main' | sudo tee /etc/apt/sources.list.d/milian.list`,
      ].join("\n"),
      commandsForCopy: [
        `sudo apt install ca-certificates curl gnupg -y`,
        `curl -L https://pkgs.keyrotate.com/debian/public.key | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/milian.gpg`,
        `echo 'deb https://pkgs.keyrotate.com/debian stable main' | sudo tee /etc/apt/sources.list.d/milian.list`,
      ].join("\n"),
      copied: false,
      showCopyButton: false,
    } as StepCommand,
    {
      key: 2,
      title: "Install Milian",
      commands: [
        `sudo apt-get update`,
        `# for CLI only`,
        `sudo apt-get install milian`,
        `# for GUI package`,
        `sudo apt-get install milian-ui`,
      ].join("\n"),
      commandsForCopy: [
        `sudo apt-get update`,
        `sudo apt-get install milian`,
        `sudo apt-get install milian-ui`,
      ].join("\n"),
      copied: false,
      showCopyButton: false,
    } as StepCommand,
    {
      key: 3,
      title: "Run Milian and log in the browser",
      commands: formatMilianUP(),
      commandsForCopy: formatMilianUP(),
      copied: false,
      showCopyButton: false,
    } as StepCommand,
  ]);

  const onCopyClick = () => {
    const stringToCopy = "curl -fsSL https://pkgs.keyrotate.com/install.sh | sh";
    copyToClipboard(stringToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Text style={{ fontWeight: "bold" }}>Install with one command</Text>
      <div
        style={{
          fontSize: ".85em",
          marginTop: 5,
          marginBottom: 25,
          position: "relative",
        }}
      >
        {!copied ? (
          <Button
            type="text"
            size="middle"
            className="btn-copy-code peer"
            icon={<CopyOutlined />}
            style={{ color: "rgb(107, 114, 128)", top: "0", zIndex: "3" }}
            onClick={onCopyClick}
          />
        ) : (
          <Button
            type="text"
            size="middle"
            className="btn-copy-code peer"
            icon={<CheckOutlined />}
            style={{ color: "green", top: "0", zIndex: "3" }}
          />
        )}
        <SyntaxHighlighter language="bash">
          curl -fsSL https://pkgs.keyrotate.com/install.sh | sh
        </SyntaxHighlighter>
      </div>
      <Text style={{ fontWeight: "bold" }}>Or install manually on Ubuntu</Text>
      <div style={{ marginTop: 5 }}>
        <TabSteps stepsItems={steps} />
      </div>
    </div>
  );
};

export default UbuntuTab;
