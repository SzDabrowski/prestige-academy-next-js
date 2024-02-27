"use client";

export const checkIfInMobileView = () => {
	if (window.innerWidth <= 768) {
		return true;
	} else {
		return false;
	}
};
