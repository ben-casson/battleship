const verticalButton = document.getElementById('vertical-btn');
const horizontalButton = document.getElementById('horizontal-btn');

function changeSelectedButton(selectedButton, unselectedButton) {
    if (!selectedButton.classList.contains('selected')) {
        unselectedButton.classList.remove('selected');
        selectedButton.classList.add('selected');
    }
}

export function changeShipOrientation() {
    verticalButton.addEventListener('click', () => {
        changeSelectedButton(verticalButton, horizontalButton);
    });
    
    horizontalButton.addEventListener('click', () => {
        changeSelectedButton(horizontalButton, verticalButton);
    });
}