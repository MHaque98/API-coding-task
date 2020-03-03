$(document).ready(function() {
  const api = "https://learn.accountingcpd.net/ACPD/API/Test/SampleObject";
  const coursesAll = document.querySelector("#courses-all");

  let courses = {};
  /*Fetch Api & load the first 10 to webPage*/
  fetch(api)
    .then(response => response.json())
    .then(data => {
      courses = data;
      showAll();
      $(".spinner-grow").hide();
    });

  // Show First 10 courses and load another 10
  function show10() {
    $(".courses")
      .slice(0, 10)
      .fadeIn();
    $("#loadMore").click(function(e) {
      e.preventDefault();
      $(".courses:hidden")
        .slice(0, 10)
        .fadeIn("slow");
    });
  }
  //Function To Sort courses A-Z, Price(needs better refinement)
  function sort(e) {
    $(".active").removeClass("active");
    $("#all").addClass("active");
    if (e.target.value === "A-Z") {
      coursesAll.innerHTML = "";
      let result = courses.sort(function(a, b) {
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      result.forEach(course => {
        coursesAll.insertAdjacentHTML(
          "beforeend",
          `
            <div  class="courses f-cat p-3 ${course.type}">
              <div class="container course ">
                <div class="row">
                  <div class="col-lg-3 d-flex align-items-center p-1">
                    <img
                      src='${course.imageSrc}'
                      alt="${course.altText}"
                      class="img-fluid d-block "
                    />
                    <div class = "label ${course.type}">${course.type}</div>
                  </div>
                  <div class="col-lg-9">
                    <h4>${course.title}</h4>
                    <p>
                      ${course.description}
                    </p>
                    <p class="price"><b>Price:</b> £${course.price}</p>
                  </div>
                </div>
              </div>
            </div>
          `
        );
      });
    } else if (e.target.value === "price") {
      coursesAll.innerHTML = "";
      let result = courses.sort(function(a, b) {
        let priceA = a.price;
        let priceB = b.price;
        if (priceA < priceB) {
          return -1;
        }
        if (priceA > priceB) {
          return 1;
        }
        return 0;
      });
      result.forEach(course => {
        coursesAll.insertAdjacentHTML(
          "beforeend",
          `
            <div  class="courses f-cat p-3 ${course.type}">
              <div class="container course ">
                <div class="row">
                  <div class="col-lg-3 d-flex align-items-center p-1">
                    <img
                      src='${course.imageSrc}'
                      alt="${course.altText}"
                      class="img-fluid d-block "
                    />
                    <div class = "label ${course.type}">${course.type}</div>
                  </div>
                  <div class="col-lg-9">
                    <h4>${course.title}</h4>
                    <p>
                      ${course.description}
                    </p>
                    <p class="price"><b>Price:</b> £${course.price}</p>
                  </div>
                </div>
              </div>
            </div>
          `
        );
      });
    } else {
      location.reload();
    }
    show10();
  }
  //Functions to filter depending on type
  function filter(e) {
    $(".active").removeClass("active");
    $(this).addClass("active");

    coursesAll.innerHTML = "";
    let result = courses.filter(course => course.type === event.target.id);
    result.forEach(course => {
      coursesAll.insertAdjacentHTML(
        "beforeend",
        `
            <div  class="courses f-cat p-3 ${course.type}">
              <div class="container course ">
                <div class="row">
                  <div class="col-lg-3 d-flex align-items-center p-1">
                    <img
                      src='${course.imageSrc}'
                      alt="${course.altText}"
                      class="img-fluid d-block "
                    />
                    <div class = "label ${course.type}">${course.type}</div>
                  </div>
                  <div class="col-lg-9">
                    <h4>${course.title}</h4>
                    <p>
                      ${course.description}
                    </p>
                    <p class="price"><b>Price:</b> £${course.price}</p>
                  </div>
                </div>
              </div>
            </div>
          `
      );
      show10();
    });
  }
  function showAll() {
    coursesAll.innerHTML = "";
    courses.forEach(course => {
      $(".active").removeClass("active");
      $("#all").addClass("active");

      coursesAll.insertAdjacentHTML(
        "beforeend",
        `
            <div  class="filterDiv courses f-cat p-3 ${course.type}">
              <div class="container course ">
                <div class="row">
                  <div class="col-lg-3 d-flex align-items-center p-1">
                    <img
                      src='${course.imageSrc}'
                      alt="${course.altText}"
                      class="img-fluid d-block "
                    />
                    <div class = "label ${course.type}">${course.type}</div>
                  </div>
                  <div class="col-lg-9">
                    <h4>${course.title}</h4>
                    <p>
                      ${course.description}
                    </p>
                    <p class="price"><b>Price:</b> £${course.price}</p>
                  </div>
                </div>
              </div>
            </div>
          `
      );
      show10();
    });
  }

  //EVent listeners
  document.getElementById("sort").addEventListener("change", sort);
  document.getElementById("tax").addEventListener("click", filter);
  document.getElementById("communication").addEventListener("click", filter);
  document.getElementById("technology").addEventListener("click", filter);
  document.getElementById("all").addEventListener("click", showAll);
});
