import {
  Button,
  Modal,
  Typography,
  message,
} from "antd";

import { useState } from "react";

import { music } from "../../data/profile";

const {
  Title,
  Paragraph,
} = Typography;

interface SongModalProps {
  open: boolean;
  onClose: () => void;
}

const choices = [
  "Loved You First",
  "Fireproof",
  "Billie Jean",
  "Something Else",
];

export default function SongModal({
  open,
  onClose,
}: SongModalProps) {

  const [answer, setAnswer] =
    useState("");

  const submitAnswer = () => {

    if (!answer) {
      message.warning(
        "pick an answer first 😭"
      );

      return;
    }

    if (
      answer.toLowerCase() ===
      music.favoriteSong.toLowerCase()
    ) {

      message.success(
        "YOOOO YOU GOT IT 🔥"
      );

    } else {

      message.error(
        `nah 😭 the answer was "${music.favoriteSong}"`
      );

    }

    setAnswer("");
    onClose();
  };

  return (
    <Modal
      title="🎵 Guess My Favorite Song"
      open={open}
      onCancel={onClose}
      onOk={submitAnswer}
      okText="LOCK IT IN"
    >

      <Paragraph>
        think you know my favorite
        song?
      </Paragraph>

      <div className="choices">

        {choices.map(
          (song) => (
            <Button
              key={song}
              block
              type={
                answer === song
                  ? "primary"
                  : "default"
              }
              onClick={() =>
                setAnswer(song)
              }
            >
              {song}
            </Button>
          )
        )}

      </div>

      <Title
        level={5}
        style={{
          marginTop: 20,
        }}
      >
        hint:
      </Title>

      <Paragraph type="secondary">
        it's by {music.artist} 👀
      </Paragraph>

    </Modal>
  );
}