<template>
    <div class="i-layout-page-header">
        <div class="ivu-page-header">
            <div class="ivu-page-header-detail">
                <div class="ivu-page-header-main">
                    <div class="ivu-page-header-row">
                        <div class="ivu-page-header-title">
                            <slot name="title"></slot>
                        </div>
                    </div>
                    <div class="ivu-page-header-row">
                        <div class="ivu-page-header-content">
                            <slot name="desc"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>