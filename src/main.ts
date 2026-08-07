

const message: string = "Hello, TypeScript! 8.a";
const startTime = new Date();
console.log(message + ' started at ' + startTime.toLocaleString());

type MenuGroup = 'personal' | 'digitalSafety' | 'interesting';

interface MenuItem {
  menuId: string;
  linkId: string;
  sectionId?: string;
  htmlFile?: string;
  groupToShow?: MenuGroup;
  aliases?: string[];
}

const MENU_ITEMS: MenuItem[] = [
  { menuId: 'home', linkId: 'homeLink', sectionId: 'home', groupToShow: 'personal', aliases: [''] },
  { menuId: 'digitalSafetyMenu', linkId: 'digitalSafetyMenuLink', sectionId: 'digitalSafety', groupToShow: 'digitalSafety', aliases: ['safety'] },
  { menuId: 'interestingMenu', linkId: 'interestingMenuLink', sectionId: 'interestingMain', groupToShow: 'interesting' },
  { menuId: 'scams', linkId: 'scamsLink', sectionId: 'scams', htmlFile: 'scams.html', groupToShow: 'digitalSafety', aliases: ['test2'] },
  { menuId: 'internet', linkId: 'internetLink', sectionId: 'internet', htmlFile: 'internet.html', groupToShow: 'digitalSafety', aliases: ['internet', 'safety'] },
  { menuId: 'windows', linkId: 'windowsLink', sectionId: 'windows', htmlFile: 'windows.html', groupToShow: 'digitalSafety' },
  { menuId: 'android', linkId: 'androidLink', sectionId: 'android', htmlFile: 'androidSecurity.html', groupToShow: 'digitalSafety', aliases: ['androidSecurity'] },
  { menuId: 'linux', linkId: 'linuxLink', sectionId: 'linux', htmlFile: 'whylinux.html', groupToShow: 'digitalSafety' },
  { menuId: 'windowsTools', linkId: 'windowsToolsLink', sectionId: 'windowsTools', htmlFile: 'windowsTools.html', groupToShow: 'interesting', aliases: ['tools'] },
  { menuId: 'interesting', linkId: 'interestingLink', sectionId: 'interesting', htmlFile: 'interesting.html', groupToShow: 'interesting' },
  { menuId: 'about', linkId: 'aboutLink', sectionId: 'about', htmlFile: 'about.html', groupToShow: 'personal' }
];

const MENU_ITEMS_BY_ID = new Map(MENU_ITEMS.map(item => [item.menuId.toLowerCase(), item]));
const MENU_ALIASES = new Map<string, string>();

for (const item of MENU_ITEMS) {
  MENU_ALIASES.set(item.menuId.toLowerCase(), item.menuId);
  (item.aliases ?? []).forEach(alias => MENU_ALIASES.set(alias.toLowerCase(), item.menuId));
}

preloadDataPages();

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


function preloadDataPages() {
  for (const item of MENU_ITEMS) {
    if (item.htmlFile && item.sectionId) {
      console.log(`Preloading ${item.htmlFile} for section ${item.sectionId}`);
      showContents(item.linkId, item.sectionId, item.htmlFile);
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  initMenuSystem();
  preloadDataPages();
  activateMenuItem('home');
  toggleInternetSafetyText();
  console.log('DOM fully loaded and parsed');

  // Detect and apply system theme
  detectAndApplySystemTheme();

  handleURLQuery();



  setInterval(() => {

    updateInternetParagraph(pickRandomInternetComment());
  }, 15000);
  hookAllPopupTriggers();

});

function hookAllPopupTriggers(root: ParentNode = document): void {
  const triggers = root.querySelectorAll<HTMLSpanElement>('.popup-trigger');
  console.log('hookAllPopupTriggers: Found', triggers.length, 'popup triggers');

  triggers.forEach((el) => {
    if (el.getAttribute('data-popup-hooked') === 'true') {
      return;
    }

    el.setAttribute('data-popup-hooked', 'true');

    const popupContent = el.querySelector<HTMLElement>(':scope > .popup-content');
    if (!popupContent) {
      const content = document.createElement('span');
      content.className = 'popup-content';
      content.textContent = el.dataset.popup ?? '';
      el.appendChild(content);
    }

    if (!el.querySelector<HTMLElement>(':scope > .info-icon')) {
      const icon = document.createElement('span');
      icon.className = 'info-icon';
      el.insertBefore(icon, el.firstChild);
    }
  });
}




function handlePageSelection(selectedPage: string) {
  const resolvedMenuId = MENU_ALIASES.get(selectedPage.toLowerCase());
  if (!resolvedMenuId) return;
  activateMenuItem(resolvedMenuId);
}




function handleURLQuery() {
  // const queryParams = new URLSearchParams(window.location.search);

  const path = window.location.pathname;


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






function initMenuSystem(): void {
  const menuElement = document.querySelector('.menu');
  if (!menuElement) {
    console.error('Menu element not found');
    return;
  }

  menuElement.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const menuItemElement = target.closest('[data-menu-id]') as HTMLElement | null;
    if (!menuItemElement) return;

    const menuId = menuItemElement.dataset.menuId;
    if (!menuId) return;

    e.preventDefault();
    e.stopPropagation();
    activateMenuItem(menuId);
  });
}

function activateMenuItem(menuId: string): void {
  const item = MENU_ITEMS_BY_ID.get(menuId.toLowerCase());
  if (!item) {
    console.error(`Unknown menu item: ${menuId}`);
    return;
  }

  if (item.groupToShow) {
    setVisibleSubmenuGroup(item.groupToShow);
  }

  if (item.sectionId) {
    showMainContent(item.sectionId);
  }

  if (item.htmlFile && item.sectionId) {
    showContents(item.linkId, item.sectionId, item.htmlFile);
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
        hookAllPopupTriggers(theContent);
      })
      .catch((error: Error) => {
        theContent.innerHTML = `Error loading content: ${error.message}`;
      });
  } else {
    console.error(`showContents() Required DOM elements ${linkID}/ ${divID} or ${theContent} not found`);
  }
}


function turnOffMenuSections() {
  setVisibleSubmenuGroup(null);
}


function setVisibleSubmenuGroup(group: MenuGroup | null): void {
  const groupedItems = document.querySelectorAll('[data-menu-group]') as NodeListOf<HTMLElement>;

  groupedItems.forEach((element) => {
    if (!group) {
      element.style.display = 'none';
      return;
    }

    element.style.display = element.dataset.menuGroup === group ? 'initial' : 'none';
  });
}


function goDigitalMenus() {
  setVisibleSubmenuGroup('digitalSafety');
};



function goPersonalMenus() {
  setVisibleSubmenuGroup('personal');
}

function goInterestingThingsMenu() {
  setVisibleSubmenuGroup('interesting');
}


// Load quotes from local JSON file
function loadQuotes(): Promise<any> {
  return fetch('dist/data/quotes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load quotes: HTTP ${response.status}`);
      }
      return response.json();
    });
}

function PickQuoteFromList(quotes: any[]): any {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}


function getRandomQuoteAndUpdateTextArea() {
  const output = document.getElementById('quoteOutput') as HTMLParagraphElement;
  const cite = document.getElementById('quoteCite');
  output.innerHTML = "";
  cite!.textContent = "";
  loadQuotes().then(quotes => {
    const quote = PickQuoteFromList(quotes);
    output.textContent = String(quote.Comment ?? '');
    if (quote.Author.length > 0) {
      cite!.textContent = `Citation: ${quote.Author}`;
    } else {
      cite!.textContent = '';
    }
    // document.getElementById('quoteOutput').innerHTML = `${quote.Comment}\n-- ${quote.Author}`;
  }).catch(error => {
    console.error(error);
    output.textContent = 'Sorry, local quotes are unavailable right now.';
    cite!.textContent = '';
  });
}



function _Official_getRandomQuoteAndUpdateTextArea() {
  const output = document.getElementById('quoteOutput') as HTMLParagraphElement;
  const cite = document.getElementById('quoteCite');
  output.innerHTML = "";
  cite!.textContent = "";
  getRandomQuote().then(quote => {
    output.textContent = String(quote.Comment ?? '');
    if (quote.Author.length > 0) {
      cite!.textContent = `Citation: ${quote.Author}`;
    } else {
      cite!.textContent = '';
    }
    // document.getElementById('quoteOutput').innerHTML = `${quote.Comment}\n-- ${quote.Author}`;
  });
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



function OriginalgetRandomQuoteAndUpdateTextArea() {
  getRandomQuote().then(quote => {
    const output = document.getElementById('quoteOutput') as HTMLParagraphElement;
    const cite = document.getElementById('quoteCite');
    output.textContent = String(quote.Comment ?? '');
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

  document.body.className = "";
  if (theme !== "default") {
    console.log
    document.body.classList.add(`theme-${theme}`);
  }


  // const link = document.getElementById('styleTheme') as HTMLLinkElement;
  // link?.setAttribute('href', 'dist/' + styleTheme);

}

function detectAndApplySystemTheme(): void {
  // Check if the browser supports prefers-color-scheme
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

  let selectedTheme: string;

  if (darkModeQuery.matches) {
    selectedTheme = 'dark';

  } else if (lightModeQuery.matches) {
    selectedTheme = 'light';

  } else {
    selectedTheme = 'red';

  }

  SetStyleMode(selectedTheme);

  // Optional: Listen for changes in system theme preference
  darkModeQuery.addEventListener('change', (e) => {
    if (e.matches) {

      SetStyleMode('dark');
    }
  });

  lightModeQuery.addEventListener('change', (e) => {
    if (e.matches) {

      SetStyleMode('light');
    }
  });
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


function toggleInternetSafetyText() {
  const internetLink = document.getElementById('internetLink');
  if (!internetLink) return;

  internetLink.textContent = internetLink.textContent === 'Internet  safety' ? 'Internet privacy' : 'Internet  safety';

  // Update the text every 5 seconds
  setTimeout(toggleInternetSafetyText, 5000);

}
