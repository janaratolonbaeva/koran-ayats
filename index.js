window.addEventListener('DOMContentLoaded', () => {
  const filesNumber = 20;
  const content = document.querySelector('.content');
  const buttons = document.querySelector('.buttons');

  // function createIframe() {
  //   for (i = 0; i < filesNumber; i++) {
  //     const url = `https://janaratolonbaeva.github.io/koran-ayats/files/lesson-${i + 1}.pdf#view=fitH`;
  //     const iframe = document.createElement('iframe');

  //     iframe.setAttribute('src', url);
  //     iframe.setAttribute('scrolling', 'auto');
  //     iframe.setAttribute('type', 'application/pdf');
  //     iframe.setAttribute('allowfullscreen', true);
  //     iframe.setAttribute('class', `tab-content w-full min-h-screen`);
  //     if (i !== 0) {
  //       iframe.style.display = 'none';
  //     }
  //     iframe.setAttribute('id', `tab-content-${i + 1}`);
  //     content.appendChild(iframe);
  //   }
  // }

  // createIframe();

  // const adobeDCView = new AdobeDC.View({ clientId: '4526a0192e9a40de9b45c4cad96b5888', divId: 'content' });

  document.addEventListener('adobe_dc_view_sdk.ready', function () {
    function createContentItem(i) {
      const contentItem = document.createElement('div');

      contentItem.setAttribute('class', 'tab-content w-full min-h-[80vh]');
      contentItem.setAttribute('id', `tab-content-${i + 1}`);

      if (i !== 0) {
        contentItem.style.display = 'none';
      }

      console.log('tab-content-${i + 1}', `tab-content-${i + 1}`);

      if (contentItem) {
        content.appendChild(contentItem);

        var adobeDCView = new AdobeDC.View({
          clientId: '4526a0192e9a40de9b45c4cad96b5888',
          divId: `tab-content-${i + 1}`,
        });

        adobeDCView.previewFile({
          content: { location: { url: `https://janaratolonbaeva.github.io/koran-ayats/files/lesson-${i + 1}.pdf` } },
          metaData: { fileName: `lesson-${i + 1}.pdf` },
        });
      }
    }

    for (i = 0; i < filesNumber; i++) {
      createContentItem(i);
    }

    function createButton() {
      for (i = 0; i < filesNumber; i++) {
        const button = document.createElement('button');

        button.setAttribute(
          'class',
          `tab-btn tab-${i + 1} w-fit min-w-[30px] h-[30px] text-center heading-[30px] rounded-sm px-2 py-1`
        );

        if (i !== 0) {
          button.classList.add('bg-[#ccc]', 'text-[#6f491e]');
        } else {
          button.classList.add('bg-[#6f491e]', 'text-white');
        }

        button.innerHTML = `PDF ${i + 1}`;
        buttons.appendChild(button);
      }
    }

    createButton();

    function openTab(evt, tabName) {
      var i, tabContent, tabButtons;

      tabContent = document.getElementsByClassName('tab-content');

      for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
      }

      tabButtons = document.getElementsByClassName('tab-btn');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('bg-[#6f491e]', 'text-white');
        tabButtons[i].classList.add('bg-[#ccc]', 'text-[#6f491e]');
      }
      const iframe = document.getElementById(tabName);

      iframe.style.display = 'block';

      evt.currentTarget.classList.remove('bg-[#ccc]', 'text-[#6f491e]');
      evt.currentTarget.classList.add('bg-[#6f491e]', 'text-white');
    }

    const buttonItems = document.querySelectorAll('.tab-btn');

    buttonItems.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        openTab(e, `tab-content-${index + 1}`);
      });
    });
  });
});
