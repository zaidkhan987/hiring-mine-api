
const callingJobsApi = async () => {
    
        // Fetch job data
        const jobsApi = await fetch("https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=1000&pageNo=1&keyWord=&category");
        const resJson = await jobsApi.json();
        const jobs = resJson.data;
        console.log(jobs);
        

        // Get input value
        const input = document.querySelector("#jobInput").value.toLowerCase();

        // Filter jobs based on input value
        const filteredJobs = jobs.filter((item) => {
            return item.designation.toLowerCase().includes(input);
        });

        // Clear previous content
        const cardGroupContainer = document.querySelector('#cardGroupManual');
        cardGroupContainer.innerHTML = '';

    
        

        // Append filtered jobs to the DOM
        filteredJobs.forEach((item) => {
            console.log(item.views);

            const salaryDisplay = (item.salaryCurrency && item.payRangeStart && item.payRangeEnd)
                ? `${item.salaryCurrency.toUpperCase()} ${item.payRangeStart} - ${item.payRangeEnd}`
                : "No Salary Mentioned";

                const locationDisplay = (item.city || item.county)
                ? `${item.city}, ${item.country}`
                : "No Location Mention";
            
            const jobCatagory = document.createElement('div');
            jobCatagory.classList.add('jobBg','manualCardCatagory');
            jobCatagory.innerHTML = `
                <div class="card-body">
                    <p class="d-flex justify-content-between mb" id="anonumous">${item.companyName || "Anonymous"}<img src="./Asset/download.png" alt="" style="width: 50px; height: 30px;"></p>
                    <p class="designation mt">${item.designation}</p>
                    <p class="salary mt mb2 salary">${salaryDisplay}</p>
                    <p class="job-d jobDesc mb1 location">${locationDisplay}</p>
                    <div class="d-flex justify-content-between py-2 timing mb1">
                        <p class="mb">${item.updatedAt.slice(0,10)}</p>
                        <p>${item.views} views</p>
                    </div>
                </div>
            `;
            cardGroupContainer.appendChild(jobCatagory);
        });

};

const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", callingJobsApi);
