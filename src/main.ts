

const message: string = "Hello, TypeScript! 8.a";
const startTime = new Date();
console.log(message + ' started at ' + startTime.toLocaleString());
turnOffMenuSections();
preloadDataPages();
goPersonalMenus();



function writeStarted() {
  console.log('writeStarted');
}



function showExtended(divTag: string) {
  console.log('showExtended:', divTag);
  const selectedID = document.getElementById(divTag);
  if (selectedID) {
    selectedID.style.display = selectedID.style.display === "block" ? "none" : "block";
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


function preloadDataPages() {

  showContents('windowsLink', 'windows', 'windows.html');
  showContents('linuxLink', 'linux', 'whylinux.html');
  showContents('internetLink', 'internet', 'internet.html');
  showContents('scamsLink', 'scams', 'scams.html');
  showContents('interestingLink', 'interesting', 'interesting.html');
  showContents('windowsToolsLink', 'windowsTools', 'windowsTools.html');
  showContents('aboutLink', 'about', 'about.html');

}


document.addEventListener('DOMContentLoaded', () => {
  addMenuClickHandler('windowsLink', 'windows', 'windows.html');
  addMenuClickHandler('linuxLink', 'linux', 'whylinux.html');
  addMenuClickHandler('internetLink', 'internet', 'internet.html');
  addMenuClickHandler('scamsLink', 'scams', 'scams.html');
  addMenuClickHandler('interestingLink', 'interesting', 'interesting.html');
  addMenuClickHandler('windowsToolsLink', 'windowsTools', 'windowsTools.html');
  addMenuClickHandler('aboutLink', 'about', 'about.html');
  console.log('DOM fully loaded and parsed');
  handleURLQuery();


  setInterval(() => {
    const randomTextString = pickRandomInternetComment();
    updateInternetParagraph(pickRandomInternetComment());
  }, 15000);

});


function handlePageSelection(selectedPage: string) {

  if (selectedPage === 'test2') {
    document.getElementById('scamsLink')?.click();
  }
  if (selectedPage === 'scams') {
    document.getElementById('scamsLink')?.click();
  }
  if (selectedPage === 'interesting') {
    document.getElementById('interestingLink')?.click();
  }
  if (selectedPage === 'internet') {
    document.getElementById('internetLink')?.click();
  }
  if (selectedPage === 'windows') {
    document.getElementById('windowsLink')?.click();
  }
  if (selectedPage === 'safety') {
    document.getElementById('internetLink')?.click();
  }
  if (selectedPage === 'windowsTools') {
    document.getElementById('windowsToolsLink')?.click();
  }
  if (selectedPage === 'tools') {
    document.getElementById('windowsToolsLink')?.click();
  }

  if (selectedPage === 'linux') {
    document.getElementById('linuxLink')?.click();
  }
  if (selectedPage === 'about') {
    document.getElementById('aboutLink')?.click();
  }
}




function handleURLQuery() {
  // const queryParams = new URLSearchParams(window.location.search);

  const path = window.location.pathname;
  console.log('handleURLQuery', path);


  // const queryParams = new URLSearchParams(path.substring(path.indexOf('?') + 1));
  const queryParams = new URLSearchParams(window.location.search);
  handleQueryParams(queryParams);

  console.log('handleURLQuery params', Array.from(queryParams.entries()));
  const segments = path.split('/').filter(Boolean);

  for (const segment of segments) {
    console.log('handleURLQuery segment', segment);
    handlePageSelection(segment);
  }


}



function addMenuClickHandler(linkID: string, divID: string, htmlFile: string): void {
  const theLink: HTMLElement | null = document.getElementById(linkID);
  const theContent: HTMLElement | null = document.getElementById(divID);

  console.log(`addMenuClickHandler linkID=${linkID} divID=${divID} htmlFile=${htmlFile}`);

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
  const digitalSafetyStuffElements = document.querySelectorAll('.digitalSafetyStuff') as NodeListOf<HTMLElement>;
  const interestingThings = document.querySelectorAll('.interestingThingsStuff') as NodeListOf<HTMLElement>;

  personalStuffElements.forEach((element) => {
    element.style.display = 'none';

  });


  digitalSafetyStuffElements.forEach((element) => {
    element.style.display = 'none';
  });

  interestingThings.forEach((element) => {
    element.style.display = 'none';
  });


}


function goDigitalMenus() {

  turnOffMenuSections();
  const digitalSafetyStuffElements = document.querySelectorAll('.digitalSafetyStuff') as NodeListOf<HTMLElement>;

  digitalSafetyStuffElements.forEach((element) => {
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

function SetStyleMode(theme: string) {
  console.log('SetStyleMode:', theme);
  document.body.className = "";
  if (theme !== "default") {
    console.log
    document.body.classList.add(`theme-${theme}`);
  }


  // const link = document.getElementById('styleTheme') as HTMLLinkElement;
  // link?.setAttribute('href', 'dist/' + styleTheme);

}

function pickRandomInternetComment() {
  const textStrings = [
    "It's not that I have anything to hide, it's that  I  have nothing that  I want  to show  YOU !",
    "Privacy is a dial, not a switch. Turn it up to the level where you feel safe.",
    "The right most valued by all civilized men is the right to be left alone -- Supreme justice Lewis Brandeis",
    "Saying you have nothing to hide is no different than saying you don't care about free speech because you have nothing to say. -- Edward Snowden",
    "Privacy is not an option, and it shouldn't be the price we accept for just getting on the Internet. -- Gary Kovacs",
    "The more you share, the less you own. -- Unknown",
    "All human beings have three lives: public, private, and secret. ― Gabriel García Márquez",
    "I don't know why people are so keen to put the details of their private life in public; they forget that invisibility is a superpower -- Banksy",
    "Bene vixit, bene qui latuit. (He has lived well, who has hidden well.) -- Latin Proverb",
    "The right to be let alone is indeed the beginning of all freedom -- William Douglas",
    "In our time, the symbol of state intrusion into the private life is the mandatory urine test. -- Christopher Hitchens",
    "He who sacrifices privacy for convenience deserves neither.” -- Modern twist on Franklin",
    "“If you have nothing to hide, you have nothing to fear” is the battle cry of every tyrant in history.",
    "Privacy isn't about hiding; it's about dignity. -- Glenn Greenwaldd"
  ];

  const randomIndex = Math.floor(Math.random() * textStrings.length);
  const randomTextString = textStrings[randomIndex];
  console.log('pickRandomInternetComment:', randomTextString);
  return randomTextString;
}

function updateInternetParagraph(selectedString: string) {
  const internetDiv = document.getElementById('rotateInternet') as HTMLElement;
  if (!internetDiv) return; // Element not found — safely exit
  internetDiv.innerHTML = '';
  const paragraph = document.createElement('p');
  paragraph.textContent = selectedString;
  internetDiv.appendChild(paragraph);
}





function handleQueryParams(queryParams: URLSearchParams) {
  queryParams.forEach((value, key) => {
    console.log(`handleQueryParams key=${key} value=${value}`);
    if (key === 'theme') {
      SetStyleMode(value);
    }
  });
}


