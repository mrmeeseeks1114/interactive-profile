import {
  Button,
  Input,
  Modal,
  Progress,
  Space,
  Typography,
  message,
} from "antd";

import {
  PlusOutlined,
} from "@ant-design/icons";

import {
  useEffect,
  useState,
} from "react";

import {
  defaultPollOptions,
} from "../../data/profile";

const {
  Paragraph,
  Text,
} = Typography;

interface PollModalProps {
  open: boolean;
  onClose: () => void;
}

interface PollData {
  option: string;
  votes: number;
}

export default function PollModal({
  open,
  onClose,
}: PollModalProps) {

  const [options, setOptions] =
    useState<PollData[]>([]);

  const [newOption, setNewOption] =
    useState("");

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "pollOptions"
      );

    if (saved) {

      setOptions(
        JSON.parse(saved)
      );

    } else {

      const initialPoll =
        defaultPollOptions.map(
          (option) => ({
            option,
            votes: 0,
          })
        );

      setOptions(initialPoll);

      localStorage.setItem(
        "pollOptions",
        JSON.stringify(
          initialPoll
        )
      );
    }

  }, []);

  const saveOptions = (
    updated: PollData[]
  ) => {

    setOptions(updated);

    localStorage.setItem(
      "pollOptions",
      JSON.stringify(updated)
    );
  };

  const vote = (
    index: number
  ) => {

    const alreadyVoted =
      localStorage.getItem(
        "hasVoted"
      );

    if (alreadyVoted) {

      message.info(
        "you already voted 👀"
      );

      return;
    }

    const updated =
      options.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                votes:
                  item.votes + 1,
              }
            : item
      );

    saveOptions(updated);

    localStorage.setItem(
      "hasVoted",
      "true"
    );

    message.success(
      "vote counted 🗳️"
    );
  };

  const addOption = () => {

    const value =
      newOption.trim();

    if (!value) {

      message.warning(
        "type something first 😭"
      );

      return;
    }

    const exists =
      options.some(
        (item) =>
          item.option.toLowerCase() ===
          value.toLowerCase()
      );

    if (exists) {

      message.warning(
        "that option already exists"
      );

      return;
    }

    const updated = [
      ...options,
      {
        option: value,
        votes: 0,
      },
    ];

    saveOptions(updated);

    setNewOption("");

    message.success(
      "new option added 👀"
    );
  };

  const totalVotes =
    options.reduce(
      (total, item) =>
        total + item.votes,
      0
    );

  return (
    <Modal
      title="🗳️ Community Poll"
      open={open}
      onCancel={onClose}
      footer={null}
    >

      <Paragraph>
        what should I play next?
      </Paragraph>

      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >

        {options.map(
          (item, index) => {

            const percentage =
              totalVotes === 0
                ? 0
                : Math.round(
                    (item.votes /
                      totalVotes) *
                      100
                  );

            return (
              <div
                key={item.option}
                className="poll-option"
              >

                <Button
                  block
                  onClick={() =>
                    vote(index)
                  }
                >
                  {item.option}
                </Button>

                <Progress
                  percent={
                    percentage
                  }
                  size="small"
                />

                <Text type="secondary">
                  {item.votes} vote
                  {item.votes !== 1
                    ? "s"
                    : ""}
                </Text>

              </div>
            );
          }
        )}

      </Space>

      <div className="add-option">

        <Paragraph>
          <Text strong>
            add your own option
          </Text>
        </Paragraph>

        <Space.Compact
          style={{
            width: "100%",
          }}
        >

          <Input
            placeholder="your idea..."
            value={newOption}
            onChange={(e) =>
              setNewOption(
                e.target.value
              )
            }
            onPressEnter={
              addOption
            }
          />

          <Button
            type="primary"
            danger
            icon={
              <PlusOutlined />
            }
            onClick={addOption}
          >
            ADD
          </Button>

        </Space.Compact>

      </div>

    </Modal>
  );
}