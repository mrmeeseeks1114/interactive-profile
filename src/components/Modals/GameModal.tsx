import {
  Button,
  Modal,
  Typography,
  message,
} from "antd";

import {
  DesktopOutlined,
} from "@ant-design/icons";

import { useState } from "react";

import { games } from "../../data/profile";

const {
  Title,
  Paragraph,
} = Typography;

interface GameModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GameModal({
  open,
  onClose,
}: GameModalProps) {

  const [selected, setSelected] =
    useState("");

  const chooseGame = (
    game: string
  ) => {

    setSelected(game);

    localStorage.setItem(
      "chosenGame",
      game
    );

    message.success(
      `${game} it is 👀🎮`
    );

    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <Modal
      title="🎮 Choose My Next Game"
      open={open}
      onCancel={onClose}
      footer={null}
    >

      <Paragraph>
        you have control now.
        choose wisely.
      </Paragraph>

      <div className="game-choices">

        {games.map(
          (game) => (

            <Button
              key={game}
              block
              size="large"
              icon={
                <DesktopOutlined />
              }
              type={
                selected === game
                  ? "primary"
                  : "default"
              }
              danger={
                selected === game
              }
              onClick={() =>
                chooseGame(game)
              }
            >
              {game}
            </Button>

          )
        )}

      </div>

      {selected && (

        <div className="selected-game">

          <Title level={4}>
            🎯 your choice:
          </Title>

          <Paragraph>
            {selected}
          </Paragraph>

        </div>

      )}

    </Modal>
  );
}