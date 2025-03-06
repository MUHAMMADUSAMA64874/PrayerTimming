const images1 = document.querySelectorAll('.slider-container-1 .slider-image');
      let index1 = 0;

      function changeImage1() {
        images1.forEach(image => image.style.display = 'none');
        index1 = (index1 + 1) % images1.length;
        images1[index1].style.display = 'block';
      }

      changeImage1(); 
      setInterval(changeImage1, 3000); 

      const images2 = document.querySelectorAll('.slider-container-2 .slider-image');
      let index2 = 0;

      function changeImage2() {
        images2.forEach(image => image.style.display = 'none');
        index2 = (index2 + 1) % images2.length;
        images2[index2].style.display = 'block';
      }

      changeImage2(); 
      setInterval(changeImage2, 3000); 

   
    var prayerTimes = {
        'Fajar': '18:30:00',
        'ZOHAR': '19:30:00',
        'ASR': '20:30:00',
        'MAGHRIB': '18:11:00',
        'ISHA': '22:30:00'
    };
function calculateTimeRemaining() {
    var currentTime = new Date();

    var nextJamat = getNextJamat(currentTime);

    if (!nextJamat || nextJamat.time.getTime() === Infinity) {
        // No valid prayer time found
        console.log("No valid prayer time found");
        document.getElementById("timeUntilNextJamat").innerText = "--:--:--";
        return;
    }

    var timeDifference = nextJamat.time - currentTime;

    if (timeDifference < 0) {
        currentTime = new Date();
        nextJamat = getNextJamat(currentTime);
        timeDifference = nextJamat.time - currentTime;
    }

    var hours = Math.floor(timeDifference / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    console.log("Hours: " + hours + ", Minutes: " + minutes + ", Seconds: " + seconds);

    var timeRemaining = hours + ":" + minutes + ":" + seconds;
  var displayText = "<span style='font-size: 25px; font-weight: bold;'>" + timeRemaining + "</span>" +
                  "<span style='font-size: 25px;'>  until " + nextJamat.prayerName + " jamat</span>";
document.getElementById("timeUntilNextJamat").innerHTML = displayText;


    setTimeout(calculateTimeRemaining, 1000);
}

function getNextJamat(currentTime) {
    var ishaTime = new Date(currentTime.toDateString() + ' ' + prayerTimes['ISHA']);

    if (currentTime > ishaTime) {
        var nextFajrTime = new Date(currentTime);
        nextFajrTime.setDate(currentTime.getDate() + 1); 
        nextFajrTime.setHours(0, 0, 0);
        var fajrTime = new Date(nextFajrTime.toDateString() + ' ' + prayerTimes['Fajar']);

        return { time: fajrTime, prayerName: 'Fajr' };
    }

    var nextJamatTime = new Date(8640000000000000);
    var nextJamatName = '';

    for (var prayer in prayerTimes) {
        var prayerTime = new Date(currentTime.toDateString() + ' ' + prayerTimes[prayer]);
        if (prayerTime > currentTime && prayerTime < nextJamatTime) {
            nextJamatTime = prayerTime;
            nextJamatName = prayer;
        }
    }

    if (nextJamatName === '') {
        return null;
    }

    return { time: nextJamatTime, prayerName: nextJamatName };
}

calculateTimeRemaining();


      function showTime() {
        var date = new Date();
        var h = date.getHours(); 
        var m = date.getMinutes(); 
        var s = date.getSeconds(); 
        var session = "AM";

        if (h == 0) {
          h = 12;
        }

        if (h > 12) {
          h = h - 12;
          session = "PM";
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        var time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("MyClockDisplay").innerText = time;
        document.getElementById("MyClockDisplay").textContent = time;

        setTimeout(showTime, 1000);

      }

      showTime();

      function getHijriDate(gregorianDate) {
          
        const hijriMonths = [
            "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", 
            "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", 
            "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ];

        // Simple conversion logic (not accurate)
        const year = gregorianDate.getFullYear();
        const month = gregorianDate.getMonth(); 
        const day = gregorianDate.getDate();

        
        const hijriYear = year + 622;
        const hijriMonth = hijriMonths[month]; 
        const hijriDay = day; 

        return `${hijriYear}, ${hijriDay} ${hijriMonth}`;
    }

    function updateClock() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        const englishDate = now.toLocaleDateString('en-US', options);
        document.getElementById('engDate').textContent = englishDate;

       
        const hijriDate = getHijriDate(now);
        document.getElementById('hijriDate').textContent = hijriDate;

        
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        document.getElementById('MyClockDisplay').textContent = timeString;
    }

    
    setInterval(updateClock, 1000);
   
    updateClock();