import React from 'react';
import { RichText } from 'prismic-reactjs';
import { get } from 'lodash';

import { linkResolver } from 'utils/linkResolver';

import { Contact } from 'components/contact/Contact';
import { Image } from 'components/image/Image';
import { Picture } from 'components/picture/Picture';
import { Profiles } from 'components/profiles/Profiles';
import { Profile } from 'components/profiles/Profile';
import { Text } from 'components/text/Text';
import { Video } from 'components/video/Video';
import { Gallery } from 'components/gallery/Gallery';
import { Quote } from 'components/quote/Quote';
import { Tweet } from 'components/tweet/Tweet';


export const Slices = ({ data }) => (
  <div>
    {data.map((s, i) => {
      const key = `slice-${s.type}-${i}`;


      console.log('s', s);

      console.log(s.type, get(s, 'primary.caption', []));
      switch (s.type) {

        case 'gallery':
          return (
            <Gallery
              key={key}
              title={RichText.asText(s.primary.title)}
              data={s.fields}
            />
          );

          case 'profiles':
            return (
              <Profiles
                title={RichText.asText(s.primary.profiles_title)}
                key={key}
              >
                {get(s, 'fields', []).map(({ profile_link: { name, bio, image } }, k) => (
                  <Profile
                    key={`profile-${k}`} // eslint-disable-line
                    image={get(image, 'url', '')}
                    name={RichText.asText(name)}
                    description={RichText.asText(bio)}
                  />
                ))}
              </Profiles>
            );

          case 'contact_form':
            return (
              <Contact
                key={key}
                responseTitle={RichText.asText(s.primary.response_message_title)}
                responseText={RichText.asText(s.primary.response_message_text)}
                target={RichText.asText(s.primary.target_url)}
              />
            );

          case 'image':
            return (
              <Image
                key={key}
                width={s.primary.image.dimensions.width}
                height={s.primary.image.dimensions.height}
                alt={s.primary.image.alt}
                src={s.primary.image.url}
                caption={RichText.render(s.primary.caption || [], linkResolver)}
              />
            );

          case 'text':
            return (
              <Text
                key={key}
                text={RichText.render(s.primary.text, linkResolver)}
              />
            );

          case 'quote':
            return (
              <Quote
                key={key}
                text={RichText.asText(s.primary.quote)}
              />
            );

          case 'tweets':
            return (
              s.fields.map(({ tweet }) => (
                <Tweet
                  key={tweet.url}
                  url={tweet.url}
                  authorName={tweet.author_name}
                  title={tweet.title}
                />
              ))
            );

            case 'video':
              return (
                <Video
                  key={key}
                  url={s.primary.video.url}
                  caption={RichText.render(s.primary.caption, linkResolver)}
                />
              );

            case 'picture':
              return (
                <Picture
                  key={key}
                  mobileView={get(s.primary.image, 'mobile', {})}
                  mobileView2x={get(s.primary.image, 'mobile_2x', {})}
                  tabletView={get(s.primary.image, 'tablet', {})}
                  tabletView2x={get(s.primary.image, 'tablet_2x', {})}
                  mainView={get(s.primary.image, 'desktop', {})}
                  mainView2x={get(s.primary.image, 'desktop_2x', {})}
                />
              );

            default:
              return null;
        }
    })}
  </div>
);
