const postPicNames = [
    'post_pic_chain',
    'post_pic_fire',
    'post_pic_litter',
    'post_pic_pollution',
    'post_pic_trash1',
    'post_pic_trash2',
    'post_pic_warning',
]

/**
 * Gets the picture file name using post number
 * @param {Number} postNum Number representing post number
 * @returns picture file name
 */
const getPostPicName = (postNum) => {

    while (postNum >= postPicNames.length) {
        postNum = postNum - postPicNames.length;
    }

    if (postNum < 0) {
        console.warn(`Received negative post number: ${postNum}`)
        return postPicNames[1];
    }

    return postPicNames[postNum];
}


module.exports = getPostPicName;