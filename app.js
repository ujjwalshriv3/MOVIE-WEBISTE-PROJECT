let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let search_input = document.getElementById('search_input');

left_btn.addEventListener('click', () => {
    cards.scrollLeft -=140;
})
right_btn.addEventListener('click', () => {
    cards.scrollLeft +=140;
})

let json_url = "movie.json";

fetch(json_url).then(Response => Response.json())
    .then((data) => {
        data.forEach((ele,i) => {
            let{name, imdb, date, sposter, bposter, genre, type, url,} =ele;
            let card = document.createElement('a');
            card.classList.add('card') 
            card.href = url;
            card.innerHTML = `
            <img src="${sposter}" alt="${name}" class="poster">
                    <div class="rest_card">
                        <img src="${bposter}" alt="">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${genre}, ${date}</p>
                                <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                            </div>
                        </div>
                    </div>
                    `
                    cards.appendChild(card);    
        });

        document.getElementById('title').innerText = data[0].name;
        document.getElementById('gen').innerText = data[0].genre;
        document.getElementById('date').innerText = data[0].date;
        document.getElementById('rate').innerHTML =`<span>IMDB</span><i class="bi bi-star-fill"></i>${data[0].imdb}`;

        // search data load 
        data.forEach(element => {
            let{name, imdb, date, sposter, genre, url,} = element;
            let card = document.createElement('a');
            card.classList.add('card') 
            card.href = url;
            card.innerHTML = `
            <img src="${sposter}" alt="">
                    <div class="cont">
                        <h3>${name}</h3>
                        <p>${genre}, ${date} ,<span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</p>
                    </div>
                    `
                    search.appendChild(card);

          });

        //   search filter 

        search_input.addEventListener('keyup', () => {
            let value = search_input.value.toLowerCase();
            let card = search.getElementsByClassName('card');
            Array.from(card).forEach((element) => {
                let title = element.getElementsByTagName('h3')[0].innerText.toLowerCase();
                if(title.includes(value)){
                    element.style.display = 'flex'; 
                }else{
                    element.style.display = 'none';
                }
                if(value == ''){
                    element.style.display = 'none';  
                }
                if(search_input.value==0){
                    element.style.display ="hidden";
                    element.style.display = 0;
                }
            })
        
        })

    });
