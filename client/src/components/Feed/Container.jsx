import React, { useEffect } from "react";
import css from "./container.module.css";
import useForm from "../../components/Form/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import nodpImg from "../../images/nodp.jpg";

const like = <FontAwesomeIcon icon={faHeart} />;
const comment = <FontAwesomeIcon icon={faComment} />;
const share = <FontAwesomeIcon icon={faShareAlt} />;

const Container = () => {
  const { getProfile, profile, getPost, userposts } = useForm();

  // useEffect(() => {
  //   getProfile();
  //   getPost();
  // }, [getProfile, getPost]);

  return (
    <>
      <section className={css.feed}>
        {profile.posts.length !== 0 &&
          userposts.map((post) => {
            return (
              <>
                <section className={css.post_container}>
                  <div className={css.user}>
                    <div className={css.profile_img}>
                      {profile.profilePic !== null ? (
                        <img src={profile.profilePic} alt="" />
                      ) : (
                        <img src={nodpImg} alt={profile.username} />
                      )}
                    </div>
                    <div className={css.username}>
                      <span>{profile.username}</span>
                    </div>
                  </div>
                  <div className={css.post}>
                    <img src={post.image} alt={post.caption} />
                    <div className={css.post_icons}>
                      <div className={css.post_icon}>
                        <a href="/">
                          <span className={`${css.icon} ${css.active}`}>
                            {like}
                          </span>
                          2.25k
                        </a>
                        <a href="/">
                          <span className={css.icon}>{comment}</span>
                          330
                        </a>
                      </div>
                      <a href="/">
                        <span className={css.icon}>{share}</span>
                        174
                      </a>
                    </div>
                  </div>
                  <figcaption className={css.img_caption}>
                    {profile.username} <span>{post.caption}</span>
                  </figcaption>
                </section>
              </>
            );
          })}

        <section className={css.post_container}>
          <div className={css.user}>
            <div className={css.profile_img}>
              <img src={nodpImg} alt="username" />
            </div>
            <div className={css.username}>
              <span>anderson_009</span>
            </div>
          </div>
          <div className={css.post}>
            <img src="https://picsum.photos/200/300" alt="temp" />
            <div className={css.post_icons}>
              <div className={css.post_icon}>
                <a href="/">
                  <span className={`${css.icon} ${css.active}`}>{like}</span>
                  2.25k
                </a>
                <a href="/">
                  <span className={css.icon}>{comment}</span>
                  330
                </a>
              </div>
              <a href="/">
                <span className={css.icon}>{share}</span>
                174
              </a>
            </div>
          </div>
          <figcaption className={css.img_caption}>
            anderson_009 <span> Lorem ipsum dolor sit amet.</span>
          </figcaption>
        </section>

        <section className={css.post_container}>
          <div className={css.user}>
            <div className={css.profile_img}>
              <img src={nodpImg} alt="username" />
            </div>
            <div className={css.username}>
              <span>anderson_009</span>
            </div>
          </div>
          <div className={css.post}>
            <img src="https://picsum.photos/300/200" alt="temp" />
            <div className={css.post_icons}>
              <div className={css.post_icon}>
                <a href="/">
                  <span className={`${css.icon}`}>{like}</span>
                  2.25k
                </a>
                <a href="/">
                  <span className={css.icon}>{comment}</span>
                  330
                </a>
              </div>
              <a href="/">
                <span className={css.icon}>{share}</span>
                174
              </a>
            </div>
          </div>
          <figcaption className={css.img_caption}>
            anderson_009 <span> Lorem ipsum dolor sit amet.</span>
          </figcaption>
        </section>
      </section>
    </>
  );
};

export default Container;
