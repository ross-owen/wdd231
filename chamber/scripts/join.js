document.querySelectorAll('aside section')
    .forEach((section) => {
        section.querySelector('.body-button')
            .addEventListener('click', () => {
                let dialog = section.querySelector('dialog');
                dialog.showModal();
                dialog.querySelector('button').addEventListener('click', () => dialog.close());
            });
    });

document.querySelector('#timestamp').value = Date.now();
