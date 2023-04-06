"use strict";
const dropZone = document.querySelector("div");
const input = document.querySelector("input");
let file;
let data;
const arr = [];
document.addEventListener("dragover", (ev) => ev.preventDefault());
document.addEventListener("drop", (ev) => ev.preventDefault());
dropZone.addEventListener("drop", (ev) => {
	// отключаем поведение по умолчанию
	ev.preventDefault();

	// смотрим на то, что получаем
	log(ev.dataTransfer);
	file = ev.dataTransfer.files[0];
	log(file);
	handleFile(file);
});

dropZone.addEventListener("click", () => {
	// кликаем по скрытому инпуту
	input.click();

	// обрабатываем изменение инпута
	input.addEventListener("change", () => {
		// смотрим на то, что получаем
		console.log(input.files);

		// получаем следующее (в случае передачи изображения)
		/*
			FileList {0: File, length: 1}
			=>  0: File
							lastModified: 1593246425244
							lastModifiedDate: Sat Jun 27 2020 13:27:05 GMT+0500 (Екатеринбург, стандартное время) {}
							name: "image.png"
							size: 208474
							type: "image/png"
							webkitRelativePath: ""
							__proto__: File
					length: 1
					__proto__: FileList
			*/

		// извлекаем File
		file = input.files[0];

		// проверяем
		console.log(file);

		// передаем файл в функцию для дальнейшей обработки
		handleFile(file);
	});
});

const handleFile = (file) => {
	dropZone.remove();
	input.remove();
	createText(file);
};

const createText = (text) => {
	// создаем экземпляр объекта "FileReader"
	const reader = new FileReader();
	// читаем файл как текст
	// вторым аргументом является кодировка
	// по умолчанию - utf-8,
	// но она не понимает кириллицу
	reader.readAsText(text, "windows-1251");
	// дожидаемся завершения чтения файла
	// и помещаем результат в документ
	reader.onload = () => {
		data = reader.result;
		data = data.split("\r\n").join(" ").split(" ");
		for (let i = 0; i < data.length - 2; i += 2) {
			arr.push(data[i] + data[i + 1]);
		}
		console.log(arr);
		document.body.innerHTML = `<p class="text">${arr
			.map((item) => parseInt(item, 16))
			.join(" ")}</p>`;
	};
};
