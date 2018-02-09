const http = require('https');
const cheerio = require('cheerio');

const url = 'https://www.imooc.com/learn/944';


const filterChapters = (html)=>{
    const $ = cheerio.load(html);
    let chapters = $('.chapter');


    /*
       视频数据格式：
        [{
            chapterTitle:'',
            videos:[
                title:'',
                id:''
            ]
        }]*/
    let courseData = [];
    chapters.each((item)=>{
        let chapter = $(this);
        let chapterTitle = chapter.find('strong');
        let t = chapterTitle.text();
        console.log(t);

        let videos = chapter.find('.video').children('li');
        let chapterData = {
            chapterTitle:chapterTitle,
            videos:[]
        };
        videos.each((item)=>{
            let video = $(this).find('.J-media-item');
            let videoTitle = video.text();
            let id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                videoTitle:videoTitle,
                id:id
            });
        });
        courseData.push(chapterData);
    });
    return courseData;
};

const printCourseInfo = (courseData)=>{
    console.log(1);
    courseData.forEach((item)=>{
        let chapterTitle =  item.chapterTitle;
        console.log(chapterTitle+'\n');
        item.videos.forEach((item)=>{
            console.log('['+item.id+']'+item.videoTitle+'\n');
        });
    });
    console.log(2);
};

http.get(url,(res)=>{
    let html = '';
    res.on('data',(data)=>{
        html +=data;
    });

    res.on('end',()=>{
        let courseData = filterChapters(html);
        printCourseInfo(courseData);
    })
}).on('error',()=>{
    console.log('获取课程数据出错')
});