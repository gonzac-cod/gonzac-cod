const fs = require('fs').promises;
const Parser = require('rss-parser');
const parser = new Parser();

const LASTEST_ARTICLE = '%{{latest_article}}%';

(async () => {
	const templateReadme = await fs.readFile('./README.md.tpl', {encoding:'utf-8'});
	const {items} = await parser.parseURL('https://www.gonzac-studios.com.ar/feeds/posts/default');
	const [{link, title}] = items;
	const lastArticle = `[${title}](${link})`;
	const generatedReadme = templateReadme.replace(LASTEST_ARTICLE, lastArticle);
	await fs.writeFile('./README.md', generatedReadme);
})()