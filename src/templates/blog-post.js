import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

// import '../fonts/fonts-post.css';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Panel from '../components/Panel';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
} from '../utils/i18n';

const GITHUB_USERNAME = 'mberneti';
const GITHUB_REPO_NAME = 'berneti.ir';
const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

class Translations extends React.Component {
  render() {
    let { translations, lang, languageLink, editUrl } = this.props;

    let readerTranslations = translations.filter(lang => lang !== 'en');
    let hasRussianTranslation = translations.indexOf('en') !== -1;

    return (
      <div className="translations">
        <Panel style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <span>
              {hasRussianTranslation && (
                <span>
                  Originally written in:{' '}
                  {'fa' === lang ? (
                    <b>Persian</b>
                  ) : (
                    <Link to={languageLink('fa')}>فارسی</Link>
                  )}
                  {' • '}
                  {'en' === lang ? (
                    <b>{codeToLanguage('en')}</b>
                  ) : (
                    <Link to={languageLink('en')}>English</Link>
                  )}
                </span>
              )}
            </span>
          )}
          {lang !== 'fa' && (
            <>
              <br />
              <br />
              <Link to={languageLink('fa')}>Read the original</Link>
              {' • '}
              <a href={editUrl} target="_blank" rel="noopener noreferrer">
                Improve this translation
              </a>
              {' • '}
              <Link to={`/${lang}`}>View all translated posts</Link>{' '}
            </>
          )}
        </Panel>
      </div>
    );
  }
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    let {
      previous,
      next,
      slug,
      translations,
      translatedLinks,
    } = this.props.pageContext;
    const lang = post.fields.langKey;

    // Replace original links with translated when available.
    let html = post.html;
    translatedLinks.forEach(link => {
      // jeez
      function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      let translatedLink = '/' + lang + link;
      html = html.replace(
        new RegExp('"' + escapeRegExp(link) + '"', 'g'),
        '"' + translatedLink + '"'
      );
    });

    translations = translations.slice();
    translations.sort((a, b) => {
      return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1;
    });

    loadFontsForCode(lang);
    // TODO: this curried function is annoying
    const languageLink = createLanguageLink(slug, lang);
    const enSlug = languageLink('fa');
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/deployment/src/pages/${enSlug.slice(
      1,
      enSlug.length - 1
    )}/index${lang === 'fa' ? '' : '.' + lang}.md`;
    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `https://berneti.ir${enSlug}`
    )}`;

    return (
      <Layout location={this.props.location} title={siteTitle} lang={lang}>
        <SEO
          lang={lang}
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
        />
        <main>
          <article>
            <header>
              <h1 style={{ color: 'var(--textTitle)' }}>
                {post.frontmatter.title}
              </h1>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: 'block',
                  marginBottom: rhythm(1),
                  marginTop: rhythm(-4 / 5),
                }}
              >
                {formatPostDate(post.frontmatter.date, lang)}
                {` • ${formatReadingTime(post.timeToRead, lang)}`}
              </p>
              {translations.length > 0 && (
                <Translations
                  translations={translations}
                  editUrl={editUrl}
                  languageLink={languageLink}
                  lang={lang}
                />
              )}
            </header>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <footer>
              <p>
                <a href={discussUrl} target="_blank" rel="noopener noreferrer">
                  {lang === 'fa'
                    ? 'نظرات این مطلب در توییتر'
                    : 'Discuss on Twitter'}
                </a>
                {` • `}
                <a href={editUrl} target="_blank" rel="noopener noreferrer">
                  {lang === 'fa' ? 'ویرایش صفحه' : 'Edit on GitHub'}
                </a>
              </p>
            </footer>
          </article>
        </main>
        <aside>
          <hr />
          <h3
            style={{
              fontFamily: 'Lalezar, sans-serif',
              marginTop: rhythm(0.25),
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'var(--pink)',
              }}
              to={'/'}
            >
              {lang === 'fa' ? 'برنتی • آی آر' : 'Berneti.ir'}
            </Link>
          </h3>
          <Bio lang={lang} />
          <nav>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    rel="prev"
                    style={{ marginRight: 20 }}
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </aside>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
      }
      fields {
        slug
        langKey
      }
    }
  }
`;
