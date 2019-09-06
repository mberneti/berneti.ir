import React from 'react';
import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    const lang = this.props.lang;
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          id="avatar"
          src={profilePic}
          alt={`Mohammadreza Berneti`}
          style={{
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ fontSize: rhythm(0.6) }}>
          {lang === 'fa' ? 'وبلاگ شخصی' : 'Personal blog by'}{' '}
          <a href="https://mobile.twitter.com/mberneti">
            {lang === 'fa' ? 'محمدرضا برنتی' : 'Mohammadreza Berneti'}
          </a>
          <br />
          <span
            style={{
              fontSize: rhythm(0.5),
            }}
          >
            {lang === 'fa' ? 'توسعه دهنده وب' : 'Web Developer'}
          </span>
        </p>
      </div>
    );
  }
}

export default Bio;
