const http = require('https');
const cheerio = require('cheerio');
const baseUrl = 'https://www.imooc.com/learn/';
const Promise = require('Promise');

const videoIds = [348,259,197,134,75];

//删除字符串中的所有空格
const trimAll = (str,is_global)=> {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};

const filterChapters = (html)=>{
    let $ = cheerio.load(html);
    let chapters = $('.chapter');

    let title = $(".course-infos .path span").text();
    console.log($($('.course-infos .statics span')[1]).text());
    //let number = parseInt($('.meta-value.js-learn-num').text().trim(),10);
    let number = 10;
    let n = $(".js-learn-num").text();
    console.log(trimAll(n,'g'));
    /*
    // 视频数据格式：
     courseData = {
        title:title,
        number:number,
        videos:[{
            chapterTitle:'',
            videos:[
            title:'',
            id:''
            ]
        }]
     }*/
    let courseData = {
        number:number,
        title:title,
        chaptersData:[]
    };
    chapters.each(function(){
        let chapter = $(this);
        let chapterTitle = chapter.find('strong').text().trim();
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
        courseData.chaptersData.push(chapterData);
    });
    return courseData;
};

const printCourseInfo = (coursesData)=>{
    coursesData.forEach(function (course) {
        console.log(course.number+'人学过'+course.title+'\n');
        course.chaptersData.forEach((item)=>{
            let chapterTitle =  item.chapterTitle;
            console.log(chapterTitle+'\n');
            item.videos.forEach((item)=>{
                console.log('['+item.id+']'+item.videoTitle+'\n');
            });
        });
    });
};

//Promise方式
function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log('正在爬取 '+url);
        http.get(url,(res)=>{
            let html = '';
            res.on('data',(data)=>{
                html +=data;
            });
            res.on('end',()=>{
                resolve(html);
            })
        }).on('error',(e)=>{
            reject(e)
        });
    })
}

let fetchCourseArray = [];
videoIds.forEach(function (id) {
    fetchCourseArray.push(getPageAsync(baseUrl+id));
});


Promise
    .all(fetchCourseArray)
    .then(function (pages) {
        let coursesData = [];
        pages.forEach(function(html){
            let course = filterChapters(html);
            coursesData.push(course);
        });
        coursesData.sort(function(a,b){
            return a.number<b.number;
        });
        printCourseInfo(coursesData);
    });

/*

//传统方式
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
});*/
