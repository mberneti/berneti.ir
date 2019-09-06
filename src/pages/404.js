import React from 'react';
import Layout from '../components/Layout';

class NotFoundPage extends React.Component {
  render() {
    const lang = this.props.pageContext.lang;
    return (
      <Layout location={this.props.location} lang={lang}>
        <main>
          <h1>Not Found</h1>
          <p>I haven’t written this post yet. Will you help me write it?</p>
        </main>
      </Layout>
    );
  }
}

export default NotFoundPage;
