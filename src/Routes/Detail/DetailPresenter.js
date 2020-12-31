import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Iframe from 'react-iframe';
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { Device } from "../../Components/Device";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  @media ${Device.mobile} {
    padding: 20px;
  }
  @media (min-width: 700px) and (max-width: 1100px) {
    padding: 40px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  @media ${Device.laptop} {
    flex-direction: column;
    align-items: center;
  }
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
  @media ${Device.laptop} {
    display: none;
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
  @media ${Device.laptop} {
    width: 100%;
    padding: 0px;
  }
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
@media ${Device.mobile} {
    font-size: 12px;
  }
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  @media ${Device.mobile} {
    font-size: 12px;
  }
`;
const SectionContainer = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 20px;
  @media ${Device.mobile} {
    font-size: 15px;
  }
`;

const SectionItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionCover = styled.img`
  width: 150px;
  height: 220px;
  background-size: cover;
  border-radius: 2px;
  background-position: center center;
  padding-right: 20px;
  @media ${Device.mobile} {
    width: 105px;
    height: 158px;
  }
`;
const SectionName = styled.span`
  width: 150px;
  font-size: 12px;
  margin-top: 10px;
  @media ${Device.mobile} {
    width: 105px;
    font-size: 8px;
  }
`;

const VideoContainer = styled.div`
  width: 800px;
  @media ${Device.mobile} {
    width: 280px;
  }
  @media (min-width: 700px) and (max-width: 1100px) {
    width: 680px;
  }
`;

// const Iframe = styled.iframe`
//   @media ${Device.mobile} {
//     width: 250;
//     height: 210px;
//   }
// `;
const DetailPresenter = ({ result, credits, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Kiflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Kiflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : ("/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <SectionContainer>
            <SectionTitle>Videos</SectionTitle>
            <VideoContainer>
              <Carousel arrows slidesPerPage={1}>
                {result.videos.results &&
                  result.videos.results.map((video, index) => (
                    <Iframe
                      key={index}
                      width="640"
                      height="360"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      frameborder="0"
                      gesture="media"
                      allow="encrypted-media" allowfullscreen
                     />
                    ))}
              </Carousel>
            </VideoContainer>
          </SectionContainer>
          <SectionContainer>
            <SectionTitle>Cast</SectionTitle>
            <Carousel arrows slidesPerPage={6}>
              {credits.cast.map((people) => (
                <SectionItem>
                  <SectionCover
                    src={
                      people.profile_path
                        ? `https://image.tmdb.org/t/p/original${people.profile_path}`
                        : ("/noPosterSmall.png")
                    }
                  />
                  <SectionName>Character: {people.character}</SectionName>
                  <SectionName>Name: {people.name}</SectionName>
                </SectionItem>
              ))}           
            </Carousel>
          </SectionContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  credits: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;