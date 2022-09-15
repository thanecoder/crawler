import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`enqueueing new URLs`);
    await enqueueLinks({
        globs: ['https://books.toscrape.com/**'],
        label: 'detail',
    });
});

router.addHandler('detail', async ({ request, $, log }) => {
    const title = $('title').text();
    const metaTags = $('meta').attr('content');
    const imgTags = $('img').attr('src');
    log.info(`${title}`, { url: request.loadedUrl });
    log.info(`${metaTags}`, { url: request.loadedUrl });
    log.info(`${imgTags}`, { url: request.loadedUrl });

    await Dataset.pushData({
        url: request.loadedUrl,
        title,
        metaTags,
        imgTags
    });

});
