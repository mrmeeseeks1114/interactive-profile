import {
  Button,
  Tag,
  Typography,
} from "antd";

import {
  MessageOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

interface HeroProps {
  username: string;
  tagline: string;
  onExplore: () => void;
  onMessage: () => void;
}

const {
  Title,
  Paragraph,
} = Typography;

export default function Hero({
  username,
  tagline,
  onExplore,
  onMessage,
}: HeroProps) {

  return (

    <section className="hero">

      <Tag
        color="red"
        className="hero-tag"
      >
        YOU'RE OFFICIALLY IN
      </Tag>


      <Title className="hero-title">
        yo @{username}

        <span className="wave">
          👋
        </span>
      </Title>


      <Title
        level={2}
        className="red-text"
      >
        {tagline}
      </Title>


      <Paragraph className="hero-description">
        random • weird • idk
        <br />
        gaming, music, anime,
        and random stuff you
        wanna talk about.
      </Paragraph>


      <div className="hero-buttons">

        <Button
          type="primary"
          danger
          size="large"
          icon={
            <ThunderboltOutlined />
          }
          onClick={
            onExplore
          }
        >
          EXPLORE
        </Button>


        <Button
          size="large"
          icon={
            <MessageOutlined />
          }
          onClick={
            onMessage
          }
        >
          TALK TO ME
        </Button>

      </div>

    </section>
  );
}