// quotes dont work

const message: string = "Hello, TypeScript! 8.a";
const startTime = new Date();
console.log(message + ' started at ' + startTime.toLocaleString());
turnOffMenuSections();
goPersonalMenus();




function writeStarted() {
  console.log('writeStarted');
}



function showExtended(divTag: string) {
  console.log('showExtended:', divTag);
  const lorem = document.getElementById(divTag);
  if (lorem) {
    lorem.style.display = lorem.style.display === "block" ? "none" : "block";
  }
}


function showMainContent(sectionId: string): void {
  // Hide all content sections
  const sections = document.getElementsByClassName('content-section');
  Array.from(sections).forEach((section) => section.classList.remove('active'));

  // Show the selected content section
  const selectedSection = document.getElementById(sectionId);

  if (selectedSection) {
    selectedSection.classList.add('active');
  }
}

function isDOMReady(): boolean {
  console.log('isDOMReady', new Date());
  return document.readyState === 'interactive' || document.readyState === 'complete';
}


// function preloadAndaddMenuClickHandler(linkID: string, divID: string, htmlFile: string) {
//   // failed atttempt 
//   showContents(linkID, divID, htmlFile);
//   addMenuClickHandler(linkID, divID, htmlFile);

// }


document.addEventListener('DOMContentLoaded', () => {
  addMenuClickHandler('windowsLink', 'windows', 'windows.html');
  addMenuClickHandler('linuxLink', 'linux', 'whylinux.html');
  addMenuClickHandler('internetLink', 'internet', 'internet.html');
  addMenuClickHandler('scamsLink', 'scams', 'scams.html');
  addMenuClickHandler('interestingLink', 'interesting', 'interesting.html');
  addMenuClickHandler('windowsToolsLink', 'windowsTools', 'windowsTools.html');
  addMenuClickHandler('aboutLink', 'about', 'about.html');
  handleURLQuery();

});


function handleURLQuery() {
  // const queryParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname;
  // const queryParams = new URLSearchParams(path.substring(path.indexOf('?') + 1));
  const queryParams = new URLSearchParams(window.location.search);
  const segments = path.split('/').filter(Boolean);

  for (const [key, value] of queryParams.entries()) {

    if (key === 'scams') {
      document.getElementById('scamsLink')?.click();
    }
    if (key === 'interesting') {
      document.getElementById('interestingLink')?.click();
    }
    if (key === 'internet') {
      document.getElementById('internetLink')?.click();
    }
    if (key === 'windows') {
      document.getElementById('windowsLink')?.click();
    }

    if (key === 'windowsTools') {
      document.getElementById('windowsToolsLink')?.click();
    }

    if (key === 'linux') {
      document.getElementById('linuxLink')?.click();
    }
    if (key === 'about') {
      document.getElementById('aboutLink')?.click();
    }
  }


}


function addMenuClickHandler(linkID: string, divID: string, htmlFile: string): void {
  const theLink: HTMLElement | null = document.getElementById(linkID);
  const theContent: HTMLElement | null = document.getElementById(divID);

  if (theLink && theContent) {

    theLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      showContents(linkID, divID, htmlFile);


      // fetch('dist/' + htmlFile)
      //   .then((response: Response) => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.text();
      //   })
      //   .then((data: string) => {

      //     console.log(`got data len=${data.length}`);

      //     theContent.innerHTML = data;
      //     console.log(`loaded`);

      //   })
      //   .catch((error: Error) => {
      //     theContent.innerHTML = `Error loading content: ${error.message}`;
      //   });
    });

  } else {
    console.error(`Required DOM elements ${theLink}/ ${theLink} or ${theContent} not found`);
  }
}



function showContents(linkID: string, divID: string, htmlFile: string) {
  const theLink: HTMLElement | null = document.getElementById(linkID);
  const theContent: HTMLElement | null = document.getElementById(divID);

  if (theLink && theContent) {


    fetch("dist/" + htmlFile + "?t=" + Date.now())
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data: string) => {
        theContent.innerHTML = data;
      })
      .catch((error: Error) => {
        theContent.innerHTML = `Error loading content: ${error.message}`;
      });
  } else {
    console.error(`Required DOM elements ${linkID}/ ${divID} or ${theContent} not found`);
  }
}


function turnOffMenuSections() {

  const personalStuffElements = document.querySelectorAll('.personalStuff') as NodeListOf<HTMLElement>;
  const internetSafetyStuffElements = document.querySelectorAll('.internetSafetyStuff') as NodeListOf<HTMLElement>;
  const interestingThings = document.querySelectorAll('.interestingThingsStuff') as NodeListOf<HTMLElement>;

  personalStuffElements.forEach((element) => {
    element.style.display = 'none';

  });


  internetSafetyStuffElements.forEach((element) => {
    element.style.display = 'none';
  });

  interestingThings.forEach((element) => {
    element.style.display = 'none';
  });


}


function goSafetyMenus() {

  turnOffMenuSections();
  const internetSafetyStuffElements = document.querySelectorAll('.internetSafetyStuff') as NodeListOf<HTMLElement>;

  internetSafetyStuffElements.forEach((element) => {
    element.style.display = 'initial';
  });
};



function goPersonalMenus() {

  turnOffMenuSections();
  const personalStuffElements = document.querySelectorAll('.personalStuff') as NodeListOf<HTMLElement>;

  personalStuffElements.forEach((element) => {
    element.style.display = 'initial';
  });

}

function goInterestingThingsMenu() {

  turnOffMenuSections();
  const interestingThingsStuffElements = document.querySelectorAll('.interestingThingsStuff') as NodeListOf<HTMLElement>;

  interestingThingsStuffElements.forEach((element) => {
    element.style.display = 'initial';
  });
}


function loadQuotes(): Promise<any> {
  return fetch('dist/data/quotes.json')
    .then(response => response.json());
}


function GeneratedgetRandomQuote(uri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const jsCode = `
      fetch('${uri}')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    `;
    resolve(jsCode);
  });
}



function getRandomQuoteLocally(): Promise<any> {

  return fetch('http://localhost:3000/quote')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
      return {
        Comment: "Sorry, quote server appears to be down.",
        Author: ""
      };
    });
};



function getRandomQuote(): Promise<any> {

  return fetch('https://MistyMountainSoftware.com/quote')
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
      return {
        Comment: "Sorry, quote server appears to be down.",
        Author: ""
      };
    });
};



function getRandomQuoteAndUpdateTextArea() {
  const output = document.getElementById('quoteOutput') as HTMLParagraphElement;
  const cite = document.getElementById('quoteCite');
  output.innerHTML = "";
  cite!.textContent = "";

  getRandomQuote().then(quote => {
    output.innerHTML = quote.Comment;
    if (quote.Author.length > 0) {
      cite!.textContent = `Citation: ${quote.Author}`;
    } else {
      cite!.textContent = '';
    }
    // document.getElementById('quoteOutput').innerHTML = `${quote.Comment}\n-- ${quote.Author}`;
  });
}


function OriginalgetRandomQuoteAndUpdateTextArea() {
  getRandomQuote().then(quote => {
    const output = document.getElementById('quoteOutput') as HTMLParagraphElement;
    const cite = document.getElementById('quoteCite');
    output.innerHTML = quote.Comment;
    if (quote.Author.length > 0) {
      cite!.textContent = `Citation: ${quote.Author}`;
    } else {
      cite!.textContent = '';
    }
    // document.getElementById('quoteOutput').innerHTML = `${quote.Comment}\n-- ${quote.Author}`;
  });
}

function changeGetQuoteWords() {
  const getQuoteButton = document.getElementById('getQuote') as HTMLButtonElement;
  getQuoteButton.textContent = 'Get Another Quote';
}

