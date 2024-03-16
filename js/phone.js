// load phones function
const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

// display phone function
const displayPhones = (phones) => {
  // 1 get cards container
    const cards = document.getElementById("cards");
    
    // clear cards div
    cards.textContent = '';
  phones.forEach((phone) => {
    console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card pt-4 bg-gray-100 shadow-xl`;

    //3 set innerHTML
    phoneCard.innerHTML = `
            <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
    `;
      
      // 4 append child
      cards.appendChild(phoneCard);
  });
};

// handle search button
const handleSearch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText);
    console.log(searchText);
}


