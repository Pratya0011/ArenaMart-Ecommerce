
window.onload=()=>{
    topRated();
    covid19updates()
}

//Menu Bar
pointer=()=>{
    var toggle = document.getElementById("menu");
    if(toggle.style.display == 'block'){
        toggle.style.display = 'none';
    }
    else{
        toggle.style.display =  'block';
    }
}


//var api = 'b43f37eb1d6f107f8b687b89fd5dc583'
//Show Upcomming Movies
function showUpcomming(){
    var head = document.getElementById("heading");
    var msg = document.getElementById("message")
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=en-US&page=1`)
    .then(res=>{
        const data =res.data
        console.log(data);
        var upcomming= '<h2></h2>'
        data.results.forEach(user=>{
          upcomming += `<div class="grid">
                        <div class = "strength">${user.original_title}</div>
                        <div class = "strength2">Released:${user.release_date}</div>
                        <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                        <div class = "strength3">
                        <div><i class="fa fa-heart" style="color:red;font-size:20px;"></i> ${user.popularity}</div>
                        <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                        </div>
                        </div>`
        })
        msg.innerHTML= upcomming;
        head.innerHTML='';
    }).catch(err=>{
        console.log(err);
    })
}

//Show popular movies
function showPopular(){
    var head = document.getElementById("heading");
    var msg = document.getElementById("message");
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=en-US&page=1`)
    .then(res=>{
        var data = res.data;
        console.log(data);
        var Popular= '<h2></h2>'
        data.results.forEach(user=>{
          Popular += `<div class="grid">
                        <div class = "strength">${user.original_title}</div>
                        <div class = "strength2">Released:${user.release_date}</div>
                        <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                        <div class = "strength3">    
                        <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                        </div>
                        </div>`
        });
        msg.innerHTML= Popular;
        head.innerHTML = '';
        
    }).catch(err=>{
        console.log(err);
    })
}
//search by movie name
function searchBar(){
    var msg = document.getElementById("message");
    var query = document.getElementById("moviename");
    var head = document.getElementById("heading");
    const options = {
        method: 'GET',
        url: `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${query.value}`,
        headers: {
          'x-rapidapi-key': '0902ef57d9mshac1a6c5a8e7cc69p1c1041jsne96022e1dc03',
          'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          var data = response.data;
          console.log(data);
          var Searched = '<h2></h2>'
          var searched1 = '<h2></h2>'
          
            Searched = `<div class="grid" style="width:400px;background-color: white;">
                         <div class = "strength"style="color:black">${data.title}</div>
                         <div style="width:400px"><img src= "${data.poster}" height="400px"width="400px"></div>
                          <div class = "strength3">    
                           <div style="color:black"><i class="fa fa-eye" style="font-size:20px;color:black;"></i> ${data.rating_votes}</div>
                           <div style="color:black"><i class="fa fa-star checked" style="font-size:20px;color:yellow"></i> ${data.rating}</div>
                         </div>
                         
                        </div>`

           searched1 = `<div class="grid1">
                         <div>Length: ${data.length}</div><br>
                         <div>Plot: ${data.plot}</div><br>
                         <div><a href="${data.trailer.link}">Watch Trailer</a></div>
                        </div>`            
                        msg.innerHTML= Searched + searched1;
                        query.value = '';
                        head.innerHTML='';
      }).catch(function (error) {
          console.error(error);
      });
}

//Home page
function topRated(){
    var head = document.getElementById("heading");
    var msg = document.getElementById("message");
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=en-US&page=1`)
    .then(res=>{
        var data = res.data;
        console.log(data);
        var toprated= '<h2></h2>'
        data.results.forEach(user=>{
          toprated += `<div class="grid">
                        <div class = "strength">${user.original_title}</div>
                        <div class = "strength2">Released:${user.release_date}</div>
                        <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                        <div class = "strength3">    
                        <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                        </div>
                        </div>`
        })
        msg.innerHTML= toprated;
        head.innerHTML = '';
    }).catch(err=>{
        console.log(err);
    })
}
//Genre List
var myobject = {
    genres:[
        {"id":28,"name":"Action"},
        {"id":12,"name":"Adventure"},
        {"id":16,"name":"Animation"},
        {"id":35,"name":"Comedy"},
        {"id":80,"name":"Crime"},
        {"id":99,"name":"Documentary"},
        {"id":18,"name":"Drama"},
        {"id":10751,"name":"Family"},
        {"id":14,"name":"Fantasy"},
        {"id":36,"name":"History"},
        {"id":27,"name":"Horror"},
        {"id":10402,"name":"Music"},
        {"id":9648,"name":"Mystery"},
        {"id":10749,"name":"Romance"},
        {"id":878,"name":"Science Fiction"},
        {"id":10770,"name":"TV Movie"},
        {"id":53,"name":"Thriller"},
        {"id":10752,"name":"War"},
        {"id":37,"name":"Western"}]
    }
//sort by genre
function getGenere(){
    var msg = document.getElementById("message");
    var genre = document.getElementById("genreList").value;
    if(genre == "action"){
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[0].id}`)
       .then(res=>{
            var data = res.data;
            console.log(data);
            var Popular= '<h2></h2>'
            data.results.forEach(user=>{
                Popular += `<div class="grid">
                               <div class = "strength">${user.original_title}</div>
                               <div class = "strength2">Released:${user.release_date}</div>
                               <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                               <div class = "strength3">    
                               <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                               </div>
                            </div>`
            })
            var head = document.getElementById("heading");
            msg.innerHTML= Popular;
            head.innerHTML=myobject.genres[0].name;
        }).catch(err=>{
        console.log(err);
    })
   }
   else if(genre == "adventure"){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[1].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[1].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'animation'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[2].id}`)
    .then(res=>{
         var data = res.data;
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[2].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'comedy'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[3].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[3].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'crime'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[4].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[4].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'documentary'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[5].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[5].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'drama'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[6].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[6].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'family'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[7].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[7].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'fantacy'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[8].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[8].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'history'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[9].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[9].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre =='horror'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[10].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[10].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'music'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[11].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[11].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre =='mistery'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[12].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[12].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'romance'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[13].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[13].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'science-friction'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[14].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[14].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'tv-movie'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[15].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[15].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'thriller'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[16].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[16].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'war'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[17].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[17].name;
     }).catch(err=>{
     console.log(err);
 })
   }
   else if(genre == 'western'){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b43f37eb1d6f107f8b687b89fd5dc583&language=hi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${myobject.genres[18].id}`)
    .then(res=>{
         var data = res.data;
         console.log(data);
         var Popular= '<h2></h2>'
         data.results.forEach(user=>{
             Popular += `<div class="grid">
                            <div class = "strength">${user.original_title}</div>
                            <div class = "strength2">Released:${user.release_date}</div>
                            <div><img src="https://image.tmdb.org/t/p/original/${user.poster_path}"height="200px"width="200px"></div>
                            <div class = "strength3">    
                            <div><i class="fa fa-eye" style="font-size:20px"></i> ${user.vote_count}</div>
                            </div>
                         </div>`
         })
         var head = document.getElementById("heading");
         msg.innerHTML= Popular;
         head.innerHTML=myobject.genres[18].name;
     }).catch(err=>{
     console.log(err);
 })
   }
}


//covid19 live updates
 function covid19updates(){
     var covid = document.getElementById("covid-Play1");
     const options = {
        method: 'GET',
        url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total',
        params: {country: 'India'},
        headers: {
          'x-rapidapi-key': '0902ef57d9mshac1a6c5a8e7cc69p1c1041jsne96022e1dc03',
          'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          var data = response.data;
          console.log(data);

          covid.innerHTML = 'Confirmed: '+data.data.confirmed +'\xa0 \xa0 \xa0'+'Recovered: '+data.data.recovered+' \xa0 \xa0 \xa0  '+'Deaths: '+data.data.deaths;
      }).catch(function (error) {
          console.error(error);
      });
 }
