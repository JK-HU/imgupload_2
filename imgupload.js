// ͼƬԤ��
(function () {
    /**
     * ȱ��һ���ύ�ϴ�ͼƬ�İ�ť,������ʱ���뷨���ύ�ᵥ,�����е���Ϣ�ύ
     * 
     **/

    // ͼƬ�ϴ�
    // var conval = '';
    listImg = []; // ���ͼƬ ����id
    imgdataArr = []; //���ͼƬ �����ύ
    files_g = [];
    imgMsg = {};
    var base64Url;
    // input����
    var iploadimg = document.getElementsByClassName('iploadimg')[0];
    var form = document.getElementsByTagName('form')[1];
    // input
    var updataimg = document.getElementById('updataimg');
    // label�ϴ���ť
    var labelup = document.getElementsByTagName('label')[0];

    labelup.addEventListener('change', function (e) {
        addImg(e);
    });

    // �ϴ�ͼƬ
    function addImg(e) {
        var filenumMax = 1; //�ϴ�ͼƬ����
        var formData = new FormData();
        var file = e.target.files || e.dataTransfer.files; //fileList
        console.log(file)

        if (!file || !window.FileReader) return; //�����֧��ֱ��return
        if (/^image/.test(file[0].type)) {
            for (var i = 0, len = file.length; i < len; i++) {
                (function (f) {

                    var filereade = new FileReader(); //newFileReader����,��ȡ�ļ�
                    console.log(filereade)
                    filereade.onload = function (evt) {
                        const files = e.srcElement.files[0];
                        files_g = files;
                        console.log(files_g);
                        var imgURL = window.URL.createObjectURL(files) // imgURL�������ͼƬ�ı���·�����������ܽ������
                        console.log(imgURL);
                        base64Url = imgURL;
                        var filename = f.name; //�ļ���

                        imgMsg = {
                            name: filename,
                            base64Url: base64Url
                        };

                        // ------�ⲿ�ֻ�ȡͼ��------
                        //imgdataArr.push(imgMsg);
                        let fileStreamSize = calculaFileSize(base64Url);
                        let compressAfterImgUrl = "";
                        let compressAfterImgSize = "";
                        let newImg = createNewImg(base64Url);
                        $('.choiceImg').attr('src',base64Url);
                        listImg.push($('.choiceImg'));
                        imgId(listImg);
                        
                        // let icons = $('.deleimg'); //ɾ��ͼ��
                        // deleteImgIcon(icons, listImg); 

                        // ------�ⲿ�ֻ�ȡͼ�����------

                        //����Ϊע���ϴ�ͼƬ����,��Ҫɾ��
                            /**
                            *imgdataArr.push(imgMsg); 
                            **/
                        /**
                         *  let fileStreamSize = calculaFileSize(base64Url);
                            let compressAfterImgUrl = "";
                            let compressAfterImgSize = "";
                            let newImg = createNewImg(base64Url);

                            var div = document.createElement("div");
                            var img = document.createElement("img");
                            var icons = document.createElement("i");
                            div.className = 'deposit';
                            icons.className = 'iconfont icondelete deleimg';
                            img.src = imgURL;
                            listImg.push(img);
                            console.log(listImg);
                            imgId(listImg);
                            div.appendChild(img);
                            div.appendChild(icons);
                            // ɾ��ͼƬ,���ڴ���
                            deleteImgIcon(icons, listImg);
                            var imglen = listImg.length;
                            console.log(imglen + 'ͼƬ����'); 
                         * 
                         **/
                        // ����Ϊע���ϴ�ͼƬ����,��Ҫɾ��
                     
                        // ����ͼƬ��С
                        if (fileStreamSize > 5242880) {
                            try { //ͼƬ�������ѹ��ʧ�ܣ��׳��쳣
                                ompressAfterImgUrl = compressImg(img);
                                compressAfterImgSize = calculaFileSize(compressAfterImgUrl);
                                return
                            } catch (error) {
                                compressAfterImgSize = base64Url;
                                alert("�ϴ���ͼƬ�����޷�ѹ����ʹ��ԭͼ");
                            }
                        }
                        // ����ͼƬ����
                        if (imglen > filenumMax) {
                            alert(`���ϴ���${imglen}��ͼƬ,����ϴ�${filenumMax}��`);
                            moreimgdel(imglen, listImg);
                            return false;
                        }

                        iploadimg.insertBefore(div, form);

                        // �ύ��Ϣ
                        formData.append("files_g", files_g);
                        $.ajax({
                            url: "/user/upfiles/upload",
                            type: 'POST',
                            contentType: false,
                            processData: false,
                            data: formData, // ͼƬ
                            success: function (data) {
                                imgdataArr.push(data.url);
                            },
                            error: function (data) {
                                alert('�ϴ�ʧ��');
                            }

                        });
                    }
                    filereade.readAsDataURL(f);
                    //console.log(filereade)

                })(e.target.files[i]);
            }
        } else {
            alert(`�ļ�${file.name}����ͼƬ`);
        }
    }

    $('.deleimg').bind('click',function() {

        console.log(listImg)
    });


    //���ͼƬID
    function imgId(listimg) {
        var ids = '';
        return ids = listimg.map(function (imgval, index) {
            if (index >= 4) return false;
            console.log(index + '--index--');
            return listimg[index].index = index;
        });
    }

    // ɾ��ͼƬ
    function deleteImgIcon(icon, listimg) {
        console.log(icon)
        // var retuimg_id = imgId(listimg);
        //  console.log(retuimg_id);
        
        for (let i = 0, len = listimg.length; i < len; i++) {
            icon.i = i;
            icon.addEventListener('touchend', function (ev) {
                console.log(this.i)
                console.log(this)
                var span_parent = this.parentNode; //deposit
                console.log(span_parent);
                console.log(span_parent.parentNode)

                span_parent.remove(span_parent);
                span_parent.classList.remove("deposit");
                
                console.log(listImg);
                console.log(this.i);
                listimg.splice(this.i, 1);
                updataimg.value = ''; // ��ɾ��ͼƬ�����н�,input��ֵ�ÿ�,ͼƬ�ϴ���ɾ��,�޷����ϴ�������
                ev.preventDefault();
                
            }, false);
        }
    }

    // �ϴ�ͼƬ����ɾ��ͼƬ
    function moreimgdel(imglen, listimg) {
        var retuimg_id = imgId(listimg);
        listimg.splice(imglen - 1, 1);
        updataimg.value = ''; // ��ɾ��ͼƬ�����н�,input��ֵ�ÿ�,ͼƬ�ϴ���ɾ��,�޷����ϴ�������
        console.log(updataimg)
    }

    // ѹ��ͼƬ
    function compressImg(img) {
        let self = this;
        const maxSize = 200 * 1024; //200K
        const maxWidth = 640; //���������
        const maxHeight = maxWidth; //�������߶�
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        if (img.height > maxHeight) {
            //�����߶ȵȱ�����
            img.width *= maxHeight / img.height;
            img.height = maxHeight;
        }
        if (img.width > maxWidth) {
            //������ȵȱ�����
            img.height *= maxWidth / img.width;
            img.width = maxWidth;
        }
        canvas.width = img.width
        canvas.height = img.height

        const fileSize = calculaFileSize(base64Url);
        const compressRate = getCompressRate(maxSize, fileSize);
        const mineType = getBase64Type(base64Url)
        let data = canvas.toDataURL(mineType, 0.2) //data url����ʽ��ѹ��Ϊ20%
        return data;
    }

    //����ͼƬ��С
    function calculaFileSize(base64) {
        // ����base64�ļ�����С
        base64 = base64.substring(22)
        const equalIndex = base64.indexOf('=')
        if (base64.indexOf('=') > 0) {
            base64 = base64.substring(0, equalIndex)
        }
        var strLength = base64.length
        var fileLength = parseInt(strLength - (strLength / 8) * 2)
        return fileLength
    }

    //����ͼ��
    function createNewImg(base64Url) {
        // ����һ����ͼ��
        const imgWidth = 640;
        const imgHeight = 640;
        let img = new Image();
        img.src = base64Url;

        if (!img.width || img.width == 0) {
            // ��ʱͼƬ��ѹ��ʧ�ܳ����޷���ȡ�������Ҳ��û�п�͸�
            img.width = imgWidth;
            img.height = imgHeight;
        }
        return img;
    }

    // ����ύ
    $('.modify_btn').bind('click', function () {

        $('.WholesalePrice').val(); //���ۼ۸�
        $('.jinhPrice').val(); //�����۸�
        $('.sortNum').val(); //�����
        $('.cx').attr('data-cxflag'); //����״̬
        $('.lsjg').attr('data-lsflag'); //�Ƿ�������û�����
        

        if ($('.WholesalePrice').val() == '') {
            alert('���ۼ۸�ûд');
            return false;
        }else {
            $.ajax({
                url: '',
                type: 'POST',
                cache: false, //�ϴ��ļ�����Ҫ����
                data: {

                    images: imgdataArr //ͼƬ��Ϣ
                }, //ͼƬ
                success: function (data) {
    
                },
                error: function (data) {
                    alert('�ϴ�ʧ��');
                }
    
            });
        }
    
    });

})();