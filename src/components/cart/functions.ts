export const createClone = (
    imgElement: HTMLImageElement,
    cartItem: HTMLDivElement,
    cloneIndex: number,
    offset: number
) => {
    const imgRect = imgElement.getBoundingClientRect();

    const clonedImg = imgElement.cloneNode(true) as HTMLImageElement;
    clonedImg.style.position = "absolute";
    clonedImg.style.top = `${
        imgRect.top - cartItem.getBoundingClientRect().top
    }px`;
    clonedImg.style.left = `${
        imgRect.left - cartItem.getBoundingClientRect().left + offset
    }px`;
    clonedImg.style.width = `${imgRect.width}px`;
    clonedImg.style.height = `${imgRect.height}px`;
    clonedImg.style.transition = "all 0.5s ease";
    clonedImg.style.zIndex = "1000";
    clonedImg.classList.add(
        "animate__animated",
        "animate__rotateInDownRight",
        "clone"
    );
    clonedImg.setAttribute("data-clone-id", `${cloneIndex}`);

    cartItem.appendChild(clonedImg);
};