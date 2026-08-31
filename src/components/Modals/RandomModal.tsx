import {
  Button,
  Modal,
  Typography,
} from "antd";

import {
  ReloadOutlined,
} from "@ant-design/icons";

import { useState } from "react";

import {
  randomMessages,
} from "../../data/profile";

const {
  Title,
  Paragraph,
} = Typography;

interface RandomModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RandomModal({
  open,
  onClose,
}: RandomModalProps) {
  const [randomText, setRandomText] =
    useState("");

  const generateRandom =
    () => {
      const randomIndex =
        Math.floor(
          Math.random() *
            randomMessages.length
        );

      setRandomText(
        randomMessages[randomIndex]
      );
    };

  return (
    <Modal
      title="🌀 Random"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="random-box">

        {!randomText ? (
          <>
            <Title level={3}>
              you clicked it.
            </Title>

            <Paragraph>
              now press the button.
            </Paragraph>
          </>
        ) : (
          <Title level={3}>
            {randomText}
          </Title>
        )}

        <Button
          type="primary"
          danger
          size="large"
          icon={
            <ReloadOutlined />
          }
          onClick={
            generateRandom
          }
        >
          RANDOMIZE
        </Button>

      </div>
    </Modal>
  );
}