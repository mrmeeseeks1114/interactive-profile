import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  message,
  Typography,
} from "antd";

import {
  MessageOutlined,
} from "@ant-design/icons";

import { supabase } from "../../supabase";

const { TextArea } = Input;
const { Text } = Typography;

type MessageModalProps = {
  open: boolean;
  onClose: () => void;
  username: string;
};

export default function MessageModal({
  open,
  onClose,
  username,
}: MessageModalProps) {

  const [visitorMessage, setVisitorMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const submitMessage = async () => {

    const cleanMessage =
      visitorMessage.trim();

    if (!cleanMessage) {
      message.warning(
        "write something first 😭"
      );
      return;
    }

    if (!username.trim()) {
      message.warning(
        "username not found 😭"
      );
      return;
    }

    setSending(true);

    try {

      const { error } =
        await supabase
          .from("messages")
          .insert({
            username:
              username.trim(),
            message:
              cleanMessage,
          });

      if (error) {
        console.error(error);

        message.error(
          "couldn't send the message 😭"
        );

        return;
      }

      await supabase
        .from("interactions")
        .insert({
          username:
            username.trim(),
          type:
            "Feedback Sent",
          details:
            "Visitor sent a message",
        });

      message.success(
        "message sent! thanks ❤️"
      );

      setVisitorMessage("");

      onClose();

    } catch (error) {

      console.error(error);

      message.error(
        "something went wrong 😭"
      );

    } finally {

      setSending(false);

    }
  };

  const handleClose = () => {
    if (!sending) {
      setVisitorMessage("");
      onClose();
    }
  };

  return (
    <Modal
      title={
        <span>
          <MessageOutlined />
          {" "}Talk To Me
        </span>
      }
      open={open}
      onCancel={handleClose}
      footer={[
        <Button
          key="cancel"
          onClick={handleClose}
          disabled={sending}
        >
          CANCEL
        </Button>,

        <Button
          key="send"
          type="primary"
          danger
          loading={sending}
          onClick={submitMessage}
        >
          SEND
        </Button>,
      ]}
    >

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >

        <Text>
          @{username}, what do you think?
        </Text>

        <Text type="secondary">
          feedback, random thoughts,
          compliments, criticism...
          whatever 😭
        </Text>

        <TextArea
          rows={6}
          maxLength={500}
          showCount
          placeholder="be honest... 👀"
          value={visitorMessage}
          onChange={(event) =>
            setVisitorMessage(
              event.target.value
            )
          }
        />

      </div>

    </Modal>
  );
}