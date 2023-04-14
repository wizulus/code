const { Code, isNSOCourseCode, isNSOMakerCode, isOCWCourseCode, isOCWMakerCode, getCodeType } = require('./code.js')

const OCW_MAKERS = [
    '2JD-H08-CC8',
    'VHC-D08-CC8',
    'WHC-D08-CC8',
    '4XK-F08-CC8',
    'BWK-F08-CC8',
    '8XK-F08-CC8',
    'YHD-H08-CC8',
    'LHD-H08-CC8',
    'F36-G08-CC8',
    'HWK-F08-CC8',
    '7WK-F08-CC8',
    'KHD-H08-CC8',
    'LWK-F08-CC8',
    'QWK-F08-CC8',
    '5WK-F08-CC8',
    'NNY-D08-CC8',
    'DJC-D08-CC8',
    'PHC-D08-CC8',
    'FHD-H08-CC8',
    '0XK-F08-CC8'
]

const OCW_COURSES = [
    'X73-X4W-HD5',
    'WRV-V4W-HD5',
    'VK8-V4W-HD5',
    'SK8-V4W-HD5',
    'TK8-V4W-HD5',
    'RK8-V4W-HD5',
    '1DN-T4W-HD5',
    'BST-R4W-HD5',
    'GRT-R4W-HD5',
    '3L7-R4W-HD5',
    '1L7-R4W-HD5',
    '2L7-R4W-HD5',
    '0DM-Q4W-HD5',
    '1DM-Q4W-HD5',
    '2DM-Q4W-HD5',
    '3DM-Q4W-HD5',
    '4DM-Q4W-HD5',
    '5DM-Q4W-HD5',
    '6DM-Q4W-HD5',
    '7DM-Q4W-HD5'
]

const NSO_MAKERS = [
    'DNW-TB6-2XF',
    'X9K-9VT-F5G',
    'F88-Q0J-QCG',
    '42D-7F3-F0H',
    'DYX-N03-2XG',
    'C55-BD2-XLG',
    '1GS-KK9-V0G',
    '5F7-3QL-WSF',
    'DRL-HGJ-0PF',
    '36L-K1K-VGF',
    'DPG-Y92-YMF',
    'BYX-M8T-3WF',
    'DN0-BCR-4YG',
    '4NH-BLX-LTG',
    '4L8-W82-H5G',
    '0LS-5YD-TBG',
    '00J-M9V-XSF',
    'DDY-6YR-YVG',
    'B3R-W23-TKF',
    'DN4-759-4TF'
]

const NSO_COURSES = [
    '93W-SBN-P5G',
    'LP4-T9G-MCG',
    '1MN-7HM-DNF',
    'CCT-9HS-GKG',
    '6GK-XSL-N7G',
    '4G1-QBR-FLG',
    'B9M-RVD-6QF',
    'DM0-P1R-DJG',
    'DLF-HH9-PWG',
    'J8J-TYD-4JG',
    '970-HG7-SHG',
    '3R6-3GT-DPF',
    'GQC-14W-Y3G',
    '43M-7K5-SYG',
    'FWW-539-Y5G',
    '5WT-C17-LTF',
    '1DF-B69-PLG',
    '1WY-MCN-9VF',
    'P0Q-4D6-J0G',
    'FY2-7X7-7LF',
]

function testNSOCourseCodes() {
    for (let i = 0; i < NSO_COURSES.length; i++) {
        const code = NSO_COURSES[i]
        if (!isNSOCourseCode(code)) {
            console.log('NSO course code test failed: ' + code)
            return
        }
    }
    console.log('NSO course code test passed')
}

function testNSOMakerCodes() {
    for (let i = 0; i < NSO_MAKERS.length; i++) {
        const code = NSO_MAKERS[i]
        if (!isNSOMakerCode(code)) {
            console.log('NSO maker code test failed: ' + code)
            return
        }
    }
    console.log('NSO maker code test passed')
}

function testOCWCourseCodes() {
    for (let i = 0; i < OCW_COURSES.length; i++) {
        const code = OCW_COURSES[i]
        if (!isOCWCourseCode(code)) {
            console.log('OCW course code test failed: ' + code)
            return
        }
    }
    console.log('OCW course code test passed')
}

function testOCWMakerCodes() {
    for (let i = 0; i < OCW_MAKERS.length; i++) {
        const code = OCW_MAKERS[i]
        if (!isOCWMakerCode(code)) {
            console.log('OCW maker code test failed: ' + code)
            return
        }
    }
    console.log('OCW maker code test passed')
}

function testCodeType() {
    for (let i = 0; i < OCW_MAKERS.length; i++) {
        const code = OCW_MAKERS[i]
        if (getCodeType(code) !== 'OCW_MAKER') {
            console.log('OCW maker code type test failed: ' + code)
            return
        }
    }
    for (let i = 0; i < OCW_COURSES.length; i++) {
        const code = OCW_COURSES[i]
        if (getCodeType(code) !== 'OCW_COURSE') {
            console.log('OCW course code type test failed: ' + code)
            return
        }
    }
    for (let i = 0; i < NSO_MAKERS.length; i++) {
        const code = NSO_MAKERS[i]
        if (getCodeType(code) !== 'NSO_MAKER') {
            console.log('NSO maker code type test failed: ' + code)
            return
        }
    }
    for (let i = 0; i < NSO_COURSES.length; i++) {
        const code = NSO_COURSES[i]
        if (getCodeType(code) !== 'NSO_COURSE') {
            console.log('NSO course code type test failed: ' + code)
            return
        }
    }
    console.log('Code type test passed')
}

function main() {
    testNSOCourseCodes()
    testNSOMakerCodes()
    testOCWCourseCodes()
    testOCWMakerCodes()
    testCodeType()

    const code = new Code('NGD-SJG-21H')
    console.log(JSON.stringify({
        code,
        isNSOCourseCode: isNSOCourseCode(code),
        isNSOMakerCode: isNSOMakerCode(code),
        isOCWCourseCode: isOCWCourseCode(code),
        isOCWMakerCode: isOCWMakerCode(code),
        codeType: getCodeType(code),
        toString: code.toString(),
        inString: `This is a code: ${code}`,
        binary: code.inverse().valueOf().toString(2).padStart(45, '0'),
        meta: code.getMeta(),
        value: code.getValue()
    }, null, 2))
}

main()
