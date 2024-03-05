const loadData = async (inputFieldtext = 'comedy') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputFieldtext}`)
    const data = await res.json()
    const innerData = data.posts
    setTimeout(() => {
        displayData(innerData)
    }, 2000);
    
}
document.getElementById('search-btn').addEventListener('click', function () {
    const inputField = document.getElementById('input-field')
    const inputFieldtext = inputField.value
    loadData(inputFieldtext)
    loading(true)
    inputField.value = ''
})
const displayData = (data) => {
    
    // console.log(data)
    const blogsContainer = document.getElementById('blogs-container')
    blogsContainer.textContent = ''
const makeAsReadArray = []
    for (const singleData of data) {
        let isOnline = `<div class="w-3 h-3 rounded-full bg-red-600 absolute top-[-4px] right-[-2px]">
        </div>`
        if (singleData.isActive) {
            isOnline = `<div class="w-3 h-3 rounded-full bg-green-500 absolute top-[-4px] right-[-2px]">
            </div>`
        }
        // console.log(singleData)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="mb-6 px-4 lg:px-8 bg-gray-100 hover:bg-indigo-50 border-2 border-gray-100 hover:border-indigo-300 hover:shadow-md py-8 rounded-2xl ">
                            <div class="flex gap-x-5">
                                <div class="avatar">
                                    <div class="w-10 h-10 lg:w-14 lg:h-14 rounded-lg bg-gray-300 ">
                                    <img src="${singleData.image}" alt="">
                                        ${isOnline}
                                    </div>
                                </div>
                                <div class="blog-text flex flex-col flex-1 gap-y-2">
                                    <!-- category and author -->
                                    <div>
                                        <span class="mr-3 text-sm lg:mr-4"># ${singleData.category}</span>
                                        <span class="text-sm">Author : ${singleData.author.name}</span>
                                    </div>
                                    <!-- title and peragraph -->
                                    <h1 class="text-base lg:text-xl font-bold">${singleData.title}</h1>
                                    <p class="text-sm pb-5">${singleData.description}</p>

                                    <!-- comment views and add to cart -->
                                    <div class="flex flex-col lg:flex-row justify-between pt-6 border-t-2 border-dashed border-gray-400">
                                        <div class="flex gap-x-7">
                                            <!-- comment -->
                                            <div class="flex items-center gap-x-2">
                                                <img class="w-5 h-5" src="icons/comment.png" alt=""> <span>${singleData.comment_count}</span>
                                            </div>
                                            <!-- views -->
                                            <div class="flex items-center gap-x-2">
                                                <img class="w-5 h-5" src="icons/open-eye.png" alt=""> <span>${singleData.view_count}</span>
                                            </div>
                                            <!-- time -->
                                            <div class="flex items-center gap-x-2">
                                                <img class="w-5 h-5" src="icons/tabler-icon-clock-hour-9.png" alt="">
                                                <span>${singleData.posted_time}min</span>
                                            </div>

                                        </div>
                                        <div id="make-as-read${singleData.id}"  class="mt-4 lg:mt-0">
                                            <button > <img src="icons/Group.png" alt=""></button>
                                        </div>
                                     </div>
                                     
                                </div>
                            </div>
                        </div>
        `
        
        blogsContainer.appendChild(div)
        
        let makeAsRead = document.getElementById(`make-as-read${singleData.id}`)
        makeAsRead.addEventListener('click', function(){
            const newData = {
                title : singleData.title,
                viewCound : singleData.view_count
            }
            makeAsReadArray.push(newData)
            const allMakeAsRead = document.getElementById('all-make-as-read')
            allMakeAsRead.textContent = ''
            for (const data of makeAsReadArray) {
                
                const div = document.createElement('div')
                div.innerHTML= `
                <div class=" p-6 rounded-lg bg-base-100 shadow-xl mb-6">
                            <div class=" flex gap-x-8 items-center">
                                <h2 class="text-base font-semibold">${data.title}</h2>
                                <!-- views -->
                                <div class=" flex gap-x-2 mr-7">
                                    <img class="w-6 h-6" src="icons/open-eye.png" alt=""> <span>${data.viewCound}</span>
                                </div>
                            </div>
                        </div>
                `
                allMakeAsRead.appendChild(div)
            }
            document.getElementById('total-read').innerText= makeAsReadArray.length
        })
    }
    loading(false)
}

const loading=(isLoad)=>{
    const loader= document.getElementById('loader')
    if(isLoad){
        loader.classList.remove('hidden')
    }
    else{
        loader.classList.add('hidden')
    }
}
const loadBlogData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    displayPostData(data)
}
const displayPostData = (data) => {
    // console.log(data)
    
    const PostContainer = document.getElementById('all-blogs')
    for (const singleData of data) {
        function designation(isHave){
            return isHave? singleData.author.designation : 'Unknown'
        }
        function date(isHave){
            return isHave? singleData.author.posted_date : 'No publish date'
        }
        // console.log(singleData)
        const div = document.createElement('div')
        div.classList = `card  bg-base-100 shadow-lg`
        div.innerHTML = `
        <figure><img src="${singleData.cover_image}"
        alt="Shoes" /></figure>
<div class="card-body">
    <div class="flex items-center gap-x-2">
        <img class="w-5 h-5" src="icons/calendar.png"> <span class="text-gray-600 font-mulish">${date(singleData.author.posted_date)}</span>
    </div>
    <h2 class="card-title font-extrabold font-mulish py-2">${singleData.title}</h2>
    <p class="text-base text-gray-700 font-mulish">${singleData.description}</p>
    <div class="flex items-center gap-x-4 mt-5">
        <div class="avatar">
            <div class="w-14 rounded-full">
                <img src="${singleData.profile_image}" />
            </div>
        </div>
        <div>
            <h3 class=" text-xl font-extrabold font-mulish">${singleData.author.name}</h3>
            <p class="font-mulish">${designation(singleData.author.designation)}</p>
        </div>
    </div>
</div>
        `

        PostContainer.appendChild(div)
    }
}
loading(false)
loadData()
loadBlogData()