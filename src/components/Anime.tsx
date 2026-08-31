import { useState } from "react";

import {
  Card,
  Col,
  Modal,
  Row,
  Tag,
  Typography,
} from "antd";

import { PlayCircleOutlined } from "@ant-design/icons";

import { animeData } from "../data/animeData";

const { Title, Paragraph } = Typography;

export default function Anime() {
  const [selectedAnime, setSelectedAnime] =
    useState<(typeof animeData)[number] | null>(null);

  return (
    <section
      id="anime"
      className="section anime-section"
    >
      {/* =========================
          SECTION TITLE
      ========================== */}

      <div className="section-heading">
        <Tag color="red">
          MY WATCHLIST
        </Tag>

        <Title>
          anime i mess with.
        </Title>

        <Paragraph>
          click an anime to see what it's about
          and why i like it.
        </Paragraph>
      </div>


      {/* =========================
          ANIME CARDS
      ========================== */}

      <Row gutter={[20, 20]}>
        {animeData.map((anime) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={anime.id}
          >
            <Card
              className="anime-card"
              hoverable
              onClick={() => {
                setSelectedAnime(anime);
              }}
              cover={
                <div className="anime-image-wrapper">

                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="anime-image"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";

                      const parent =
                        event.currentTarget.parentElement;

                      if (parent) {
                        parent.classList.add(
                          "image-error"
                        );
                      }
                    }}
                  />

                  <div className="anime-overlay">
                    <PlayCircleOutlined />

                    <span>
                      CLICK TO VIEW
                    </span>
                  </div>

                </div>
              }
            >
              <Title
                level={4}
                className="anime-title"
              >
                {anime.title}
              </Title>

              <span className="anime-click">
                view description →
              </span>
            </Card>
          </Col>
        ))}
      </Row>


      {/* =========================
          DESCRIPTION MODAL
      ========================== */}

      <Modal
        open={selectedAnime !== null}
        onCancel={() =>
          setSelectedAnime(null)
        }
        footer={null}
        centered
        width={700}
      >
        {selectedAnime && (
          <div className="anime-modal">

            <img
              src={selectedAnime.image}
              alt={selectedAnime.title}
              className="anime-modal-image"
            />

            <div className="anime-modal-info">

              <Title level={2}>
                {selectedAnime.title}
              </Title>

              <Tag color="red">
                {selectedAnime.genre}
              </Tag>

              <Title level={4}>
                about
              </Title>

              <Paragraph>
                {selectedAnime.description}
              </Paragraph>

              <div className="anime-favorite">

                <span>
                  why i like it
                </span>

                <Paragraph>
                  {selectedAnime.whyILikeIt}
                </Paragraph>

              </div>

            </div>

          </div>
        )}
      </Modal>
    </section>
  );
}