let loadNews = async() => {
    document.getElementById('loading').classList.remove('hidden')
    let response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    let data = await response.json();
    let result = data.data.news_category;
    let newsLinkContainer = document.getElementById('link-container')

    result.forEach(element => {

        let btnDiv = document.createElement('div');
        btnDiv.innerHTML = `<li  onclick="currentButton('${element.category_name}')"><a class="cursor-pointer click" onclick="showNews('${element.category_id}', '${element.category_name}')" >${element.category_name}</a></li>`;
        newsLinkContainer.appendChild(btnDiv)
    });
}

let showNews = async(catId) => {
   

    let response = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    let data = await response.json();
    
    let newsContainer = document.getElementById('main-div');
    
    

    if(newsContainer.innerHTML !== ''){
        document.getElementById('loading').classList.add('hidden')
    }
    
    newsContainer.innerHTML = ''
    data.data.forEach(element => {
       

        let newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="flex justify-between bg-[#fff] rounded-md p-5 gap-10">
        <div class="w-2/12 border">
            <img class="rounded-md  " src="${element.thumbnail_url}" alt="title-image">
        </div>
        <div class="flex flex-col w-10/12 justify-center">
            <h4 class="font-bold text-2xl pb-8">${element.title}</h4>
            <p class="text-[#949494] pb-12">${element.details.slice(0,400)} 
            </p>
            <div class="flex justify-start items-center gap-16 ">
                <div class="flex items-center gap-2">
                    <img src="images/Rectangle 19.png" alt="profile-img">
                    <div class="text-[#949494]">
                        <h4 class="font-semibold">${element.author.name}</h4>
                        <p class="text-[#949494]">${element.author.published_date}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <img src="images/carbon_view.svg" alt="view-img">
                    <p class="text-[#2a2a2a] font-semibold"><span>${element.total_view}</span>M</p>
                </div>
                <div class="text-[#2a2a2a] font-semibold">
                    <p>Rating<span class="ml-1">${element.rating.number}</span></p>
                </div>
                <div>
                    <h4 class="px-6 py-2 cursor-pointer bg-[#d4d4d4] rounded-md font-bold">View Details</h4>
                </div>
                
            </div>
        </div>
    </div>
        `
        newsContainer.appendChild(newsDiv)
        
    })
    if(newsContainer.innerHTML === ''){
        document.getElementById('no-content-found').classList.remove('hidden')
    }
}

let currentButton= (catName) => {
    let a = document.querySelectorAll('.click');
    a.forEach(element => {
        
        if(element.innerHTML === catName){
            element.classList.add('text-[#5d5fef]')
        }else{
            element.classList.remove('text-[#5d5fef]')
        }
    })
    
    
    

}

let searchNews = () => {
    let input = document.getElementById('input-field');
    let val = input.value;
    showNews(val)
    
}

loadNews()
showNews("01")

