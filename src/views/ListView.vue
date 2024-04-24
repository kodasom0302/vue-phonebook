<template>
    <div>
        <h1>전화번호부</h1>

        <h2>리스트</h2>

        <p>등록된 전화번호 리스트입니다.</p>

        <table border="1">
            <colgroup>
                <col style="width: 100px;">
                <col style="width: 120px;">
                <col style="width: 120px;">
                <col style="width: 190px;">
            </colgroup>
            <thead>
                <tr>
                    <th>이름(name)</th>
                    <th>핸드폰(hp)</th>
                    <th>회사(company)</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody v-bind:key="i" v-for="(personVo, i) in pList">
                <tr>
                    <td>{{ personVo.name }}</td>
                    <td>{{ personVo.hp }}</td>
                    <td>{{ personVo.company }}</td>
                    <td>
                        <button type="submit" v-on:click="delete(personVo.personId)">삭제하기</button>
                        <router-link v-bind:to="`/modify/${personId}`">[수정폼이동]</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>

        <router-link to="/write">등록폼 이동</router-link>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: "ListView",
    components: {},
    data() {
        return {
            pList:[],
            personVo:{
                no:"",
                name:"",
                hp:"",
                company:"",
                gender:""
            }
        };
    },
    methods: {
        getList(){
            console.log("리스트 불러오기");

            axios({
                method: 'get', // put, post, delete                   
                url: 'http://localhost:9001/phone/list',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타

                this.pList=response.data;

            }).catch(error => {
                console.log(error);
            });
        },
        delete(personId){
            console.log("삭제");
            console.log(this.personId);

            axios({
                method: 'delete', // put, post, delete                   
                url: 'http://localhost:9000/phone/delete'+this.personId,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: {personId}, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타

                if(response.data.count>0){
                    this.pList.splice(response.data, 1);
                }else{
                    alert("삭제에 실패했습니다");
                }

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created(){
        this.getList();
    }
};
</script>


<style></style>