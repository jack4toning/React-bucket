const http = require('https');
const cheerio = require('cheerio');

const url = 'https://www.imooc.com/learn/944';


//删除字符串中的所有空格
const trimAll = (str,is_global)=> {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};

const filterChapters = (html)=>{
    let $ = cheerio.load(html);
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
    chapters.each(function(){
        let chapter = $(this);
        let chapterTitle = chapter.find('strong').text().trim();
        //chapterTitle.find('i').remove();
        //chapterTitle.find('div').remove();
        chapterTitle = trimAll(chapterTitle,'g');

        let videos = chapter.find('.video').children('li');
        let chapterData = {
            chapterTitle:chapterTitle,
            videos:[]
        };
        videos.each(function(){

            let video = $(this).find('.J-media-item');
            let videoTitle = video.text().trim();
            videoTitle = trimAll(videoTitle,'g');


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
    courseData.forEach((item)=>{
        let chapterTitle =  item.chapterTitle;
        console.log(chapterTitle+'\n');
        item.videos.forEach((item)=>{
            console.log('['+item.id+']'+item.videoTitle+'\n');
        });
    });
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