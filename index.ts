/**
 * Pass a request, filename and file type, and save the file to a local pc.
 * The request result will be turned into a blob that will be downloaded.
 * It is advised to use a basic Fetch for the request.
 *
 * Function will return true if download was a success, false if it was not.
 *
 * @param request
 * @param fileName
 * @param fileType
 * @param onError - contains the thrown error in the callback.
 */
export const downloadFileAndSave = async (request: Promise<Response>, fileName: string, fileType: string, onError?: (e: any) => void): Promise<boolean> => {

	try {
		const result = await request;
		if (!result.ok) {
			throw "Error in: alten-download-file -> downloadFileAndSave() -> Could not succesfully complete passed request.";
		}
		const blob = await result.blob();
		if (!saveToPc(blob, fileName, fileType)) {
			throw "Error in: alten-download-file -> downloadFileAndSave() -> Something went wrong.";
		}
		return true;
	}
	catch (e) {
		if (onError) onError(e);
		return false;
	}
};

/**
 * Takes a blob, converts it to a file and saved it to the users pc.
 * Returns true if download is a success, false if not.
 * @param blob - Blob that will be downloaded.
 * @param fileName
 * @param fileType
 * @param onError - contains the thrown error in the callback.
 */
export const saveToPc = (blob: Blob, fileName: string, fileType: string, onError?: (e: any) => void): boolean => {
	try {
		if (!blob) {
			throw "Error in: alten-download-file -> saveToPc() -> Passed blob was undefined.";
		}
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		// the filename you want
		a.download = `${fileName}.${fileType}`;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		// Remove link element from DOM.
		document.body.removeChild(a);
		return true;
	}
	catch (e) {
		if (onError) onError(e);
		return false;
	}
}
