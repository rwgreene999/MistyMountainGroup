// From Nov29,24
// quotes dont work

const message: string = "Hello, TypeScript! 8.a";
console.log(message);
goPersonal();





function writeStarted() {
  console.log('writeStarted');
}



function showExtended(divTag: string) {
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
  return document.readyState === 'interactive' || document.readyState === 'complete';
}


// function preloadAndaddMenuClickHandler(linkID: string, divID: string, htmlFile: string) {
//   // failed atttempt 
//   showContents(linkID, divID, htmlFile);
//   addMenuClickHandler(linkID, divID, htmlFile);

// }


document.addEventListener('DOMContentLoaded', () => {
  addMenuClickHandler('interestingLink', 'interesting', 'interesting.html');
  addMenuClickHandler('windowsLink', 'windows', 'windows.html');
  addMenuClickHandler('linuxLink', 'linux', 'whylinux.html');
  addMenuClickHandler('aboutLink', 'about', 'about.html');
  addMenuClickHandler('internetLink', 'internet', 'internet.html');
  addMenuClickHandler('scamsLink', 'scams', 'scams.html');
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
  console.log('showContents', linkID, divID, htmlFile);

  const theLink: HTMLElement | null = document.getElementById(linkID);
  const theContent: HTMLElement | null = document.getElementById(divID);

  if (theLink && theContent) {

    console.log(`gonna load divID: ${divID} file: ${htmlFile}`);

    fetch("dist/" + htmlFile + "?t=" + Date.now())
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data: string) => {

        console.log(`got data len=${data.length}`);

        theContent.innerHTML = data;
        console.log(`loaded`);

      })
      .catch((error: Error) => {
        theContent.innerHTML = `Error loading content: ${error.message}`;
      });

    // theLink.addEventListener('click', (e: Event) => {
    //   e.preventDefault();

    //   fetch('dist/' + htmlFile)
    //     .then((response: Response) => {
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       return response.text();
    //     })
    //     .then((data: string) => {

    //       console.log(`got data len=${data.length}`);

    //       theContent.innerHTML = data;
    //       console.log(`loaded`);

    //     })
    //     .catch((error: Error) => {
    //       theContent.innerHTML = `Error loading content: ${error.message}`;
    //     });
    // });
  } else {
    console.error(`Required DOM elements ${theLink}/ ${theLink} or ${theContent} not found`);
  }
}



function goSafety() {

  const personalStuffElements = document.querySelectorAll('.personalStuff') as NodeListOf<HTMLElement>;
  const internetSafetyStuffElements = document.querySelectorAll('.internetSafetyStuff') as NodeListOf<HTMLElement>;

  personalStuffElements.forEach((element) => {
    element.style.display = 'none';
  });
  internetSafetyStuffElements.forEach((element) => {
    element.style.display = 'initial';
  });

}

function goPersonal() {

  const personalStuffElements = document.querySelectorAll('.personalStuff') as NodeListOf<HTMLElement>;
  const internetSafetyStuffElements = document.querySelectorAll('.internetSafetyStuff') as NodeListOf<HTMLElement>;

  personalStuffElements.forEach((element) => {
    element.style.display = 'initial';
  });
  internetSafetyStuffElements.forEach((element) => {
    element.style.display = 'none';
  });

}




function loadQuotes(): Promise<any> {
  return fetch('dist/data/quotes.json')
    .then(response => response.json());
}


function getRandomQuote(): Promise<any> {
  return loadQuotes().then(quotes => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });
}

function getRandomQuoteFromServer(): Promise<any> {

  return fetch('http://localhost:3000/quote')
    .then(response => response.json());
};




function getRandomQuoteAndUpdateTextArea() {
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
  console.log('changeGetQuoteWords');
  const getQuoteButton = document.getElementById('getQuote') as HTMLButtonElement;
  getQuoteButton.textContent = 'Get Another Quote';
}



//   Attempt to capture any click and close the open extended sections
//   BUT it runs after I clicko on Extended and therefore it closes what I open
//   function handleClicksCloseExtended(event: MouseEvent): void {
//     // Get all the extended content elements
//     const extendedContentElements = document.querySelectorAll('.extendedComment');
//     // Loop through them and close them
//     extendedContentElements.forEach((element) => {

// |||
//       const theDiv = document.getElementById(element.id);
// //      theDiv.style.display = "none";


//     });
//   }


//   // Add the event listener to the document when the DOM is ready
//   document.addEventListener('DOMContentLoaded', () => {
//     document.addEventListener('click', handleClicksCloseExtended);
//   });


/*


document.addEventListener('DOMContentLoaded', () => {
    const scamsLink: HTMLElement | null = document.getElementById('scamsLink');
    const scamsContent: HTMLElement | null = document.getElementById('scams');


    if (scamsLink && scamsContent) {
      scamsLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        
        fetch('dist/scams.html')
          .then((response: Response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((data: string) => {
            scamsContent.innerHTML = data;
          })
          .catch((error: Error) => {
            scamsContent.innerHTML = `Error loading content: ${error.message}`;
          });
      });
    } else {
      console.error('Required DOM elements not found');
    }
  });

//   <script>
//   document.addEventListener('DOMContentLoaded', function () {
//       const scamsLink = document.getElementById('scamsLink');
//       const scamsContent = document.getElementById('scams');

//       scamsLink.addEventListener('click', function (e) {
//           e.preventDefault();

//           fetch('dist/Scams.html')
//               .then(response => {
//                   if (!response.ok) {
//                       throw new Error('Network response was not ok');
//                   }
//                   return response.text();
//               })
//               .then(data => {
//                   scams.innerHTML = data;
//               })
//               .catch(error => {
//                   scam.innerHTML = 'Error loading content: ' + error.message;
//               });
//       });
//   });
// </script>



document.addEventListener('DOMContentLoaded', () => {
  const windowsLink: HTMLElement | null = document.getElementById('windowsLink');
  const windowsContent: HTMLElement | null = document.getElementById('windows');


  if (windowsLink && windowsContent) {
    windowsLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      
      fetch('dist/windows.html')
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((data: string) => {
          windowsContent.innerHTML = data;
        })
        .catch((error: Error) => {
          windowsContent.innerHTML = `Error loading content: ${error.message}`;
        });
    });
  } else {
    console.error('Required DOM elements not found');
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const linuxLink: HTMLElement | null = document.getElementById('linuxLink');
  const linuxContent: HTMLElement | null = document.getElementById('linux');

  if (linuxLink && linuxContent) {
    linuxLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      
      fetch('dist/whylinux.html')
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((data: string) => {
          linuxContent.innerHTML = data;
        })
        .catch((error: Error) => {
          linuxContent.innerHTML = `Error loading linux content: ${error.message}`;
        });
    });
  } else {
    console.error('Required DOM elements not found');
  }
});


*/

